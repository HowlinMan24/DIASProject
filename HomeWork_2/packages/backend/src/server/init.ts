import HistoricalStockData from "../models/HistoricalStockData";
import StockData from "../models/StockData";
import fs from "fs";
import csvParser from "csv-parser";
import path from "path";

const filePath1 = path.resolve(__dirname, '../../../../../DIASProject/HomeWork_1/data_all_codes.csv');
const filePath2 = path.resolve(__dirname, '../../../../../DIASProject/HomeWork_1/mse_historical_data.csv');

async function loadCsvData(csvFilePath: string, csvFilePath2: string) {
    const results: any[] = [];
    const results2: any[] = [];

    fs.createReadStream(csvFilePath)
        .pipe(csvParser())
        .on('data', (data) => {
            results.push(data);
        })
        .on('end', async () => {
            for (const stock_data of results) {
                console.log("Inserting row into stock_data:", stock_data); // Log the data
                let date = stock_data['Датум'].split(".")
                let refined = new Date(`${date[0] + '-' + date[1] + '-' + date[2]}`);
                const mappedStockData = {
                    datePublished: new Date(refined),
                    priceLastTransaction: parseFloat(stock_data['Цена на последна трансакција']),
                    minPrice: parseFloat(stock_data['Мин.']),
                    maxPrice: parseFloat(stock_data['Мак.']),
                    averagePrice: parseFloat(stock_data['Просечна цена']),
                    promotionPercentage: parseFloat(stock_data['%пром.']),
                    quantity: parseInt(stock_data['Количина'], 10),
                    turnoverBESTDenar: parseFloat(stock_data['Промет во БЕСТ во денари']),
                    totalTurnoverDenars: parseFloat(stock_data['Вкупен промет во денари']),
                    stockSymbol: stock_data['Stock Symbol'],
                    created_at: new Date(),
                    updated_at: new Date()
                };
                try {
                    await StockData.create(mappedStockData);
                    console.log('Data inserted successfully!');
                } catch (error) {
                    console.error('Error inserting data into stock_data:', error);
                }
            }
        });

    fs.createReadStream(csvFilePath2)
        .pipe(csvParser())
        .on('data', (data) => {
            results2.push(data);
        })
        .on('end', async () => {
            for (const stock_data of results2) {
                console.log("Inserting row into historical_stock_data:", stock_data['Код на издавач']); // Log the data
                let date = stock_data['Датум'].split(".")
                let refined = new Date(`${date[0] + '-' + date[1] + '-' + date[2]}`);
                const mappedStockData = {
                    publisherCode: stock_data['﻿Код на издавач'],
                    datePublished: new Date(refined), // Ensure valid Date object
                    priceLastTransaction: parseFloat(stock_data['Цена на последна трансакција']),
                    minPrice: parseFloat(stock_data['Мин.']),
                    maxPrice: parseFloat(stock_data['Мак.']),
                    averagePrice: parseFloat(stock_data['Просечна цена']),
                    promotionPercentage: parseFloat(stock_data['%пром.']),
                    quantity: parseInt(stock_data['Количина'], 10),
                    turnoverBESTDenar: parseFloat(stock_data['Промет во БЕСТ во денари']),
                    totalTurnoverDenars: parseFloat(stock_data['Вкупен промет во денари']),
                    created_at: new Date(),
                    updated_at: new Date()
                };
                try {
                    await HistoricalStockData.create(mappedStockData);
                    console.log('Data inserted successfully!');
                } catch (error) {
                    console.error('Error inserting data into historical_stock_data:', error);
                }
            }
        });
}


loadCsvData(filePath1, filePath2)
    .then(() => {
        console.log('CSV data loading completed!');
    })
    .catch((error) => {
        console.error('Error loading CSV data:', error);
    });