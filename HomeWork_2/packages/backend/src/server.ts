import express, {Request, Response} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {Sequelize, SequelizeOptions} from 'sequelize-typescript';
import * as fs from "node:fs";
import csvParser from "csv-parser";
import StockData from "./models/StockData";
import HistoricalStockData from "./models/HistoricalStockData";
import path from "node:path";
import bodyParser from "body-parser";

const sequelize = new Sequelize({
    dialect: 'mysql',
    database: 'stocks',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Makedonija.2023',
    models: [HistoricalStockData,StockData],
    logging: console.log
} as SequelizeOptions);

sequelize.authenticate().then(() => {
    console.log('Database connection established successfully.');
}).catch((err) => {
    console.error('Database connection failed:', err);
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

const port: number = 3600;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript + Node.js + Express!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// async function loadCsvData(csvFilePath: string, csvFilePath2: string) {
//     const results: any[] = [];
//     const results2: any[] = [];
//
//     fs.createReadStream(csvFilePath)
//         .pipe(csvParser())
//         .on('data', (data) => {
//             results.push(data);
//         })
//         .on('end', async () => {
//             for (const stock_data of results) {
//                 console.log("Inserting row into stock_data:", stock_data); // Log the data
//                 let date = stock_data['Датум'].split(".")
//                 let refined = new Date(`${date[0] + '-' + date[1] + '-' + date[2]}`);
//                 const mappedStockData = {
//                     datePublished: new Date(refined),
//                     priceLastTransaction: parseFloat(stock_data['Цена на последна трансакција']),
//                     minPrice: parseFloat(stock_data['Мин.']),
//                     maxPrice: parseFloat(stock_data['Мак.']),
//                     averagePrice: parseFloat(stock_data['Просечна цена']),
//                     promotionPercentage: parseFloat(stock_data['%пром.']),
//                     quantity: parseInt(stock_data['Количина'], 10),
//                     turnoverBESTDenar: parseFloat(stock_data['Промет во БЕСТ во денари']),
//                     totalTurnoverDenars: parseFloat(stock_data['Вкупен промет во денари']),
//                     stockSymbol: stock_data['Stock Symbol'],
//                     created_at: new Date(),
//                     updated_at: new Date()
//                 };
//                 try {
//                     await StockData.create(mappedStockData);
//                     console.log('Data inserted successfully!');
//                 } catch (error) {
//                     console.error('Error inserting data into stock_data:', error);
//                 }
//             }
//         });
//
//     fs.createReadStream(csvFilePath2)
//         .pipe(csvParser())
//         .on('data', (data) => {
//             results2.push(data);
//         })
//         .on('end', async () => {
//             for (const stock_data of results2) {
//                 console.log("Inserting row into historical_stock_data:", stock_data['Код на издавач']); // Log the data
//                 let date = stock_data['Датум'].split(".")
//                 let refined = new Date(`${date[0] + '-' + date[1] + '-' + date[2]}`);
//                 const mappedStockData = {
//                     publisherCode: stock_data['﻿Код на издавач'],
//                     datePublished: new Date(refined), // Ensure valid Date object
//                     priceLastTransaction: parseFloat(stock_data['Цена на последна трансакција']),
//                     minPrice: parseFloat(stock_data['Мин.']),
//                     maxPrice: parseFloat(stock_data['Мак.']),
//                     averagePrice: parseFloat(stock_data['Просечна цена']),
//                     promotionPercentage: parseFloat(stock_data['%пром.']),
//                     quantity: parseInt(stock_data['Количина'], 10),
//                     turnoverBESTDenar: parseFloat(stock_data['Промет во БЕСТ во денари']),
//                     totalTurnoverDenars: parseFloat(stock_data['Вкупен промет во денари']),
//                     created_at: new Date(),
//                     updated_at: new Date()
//                 };
//                 try {
//                     await HistoricalStockData.create(mappedStockData);
//                     console.log('Data inserted successfully!');
//                 } catch (error) {
//                     console.error('Error inserting data into historical_stock_data:', error);
//                 }
//             }
//         });
// }

// Path to your CSV file
// const filePath1 = path.resolve(__dirname, '../../../../../DIASProject/HomeWork_1/data_all_codes.csv');
// const filePath2 = path.resolve(__dirname, '../../../../../DIASProject/HomeWork_1/mse_historical_data.csv');

// Load CSV data into the database
// loadCsvData(filePath1, filePath2);

app.get('/api/stock-data', async (req, res) => {
    try {
        const stockData = await StockData.findAll({
            limit: 200,
        });
        res.json(stockData);
    } catch (error) {
        console.error('Error fetching stock data:', error);
        res.status(500).json({ error: 'Failed to fetch stock data' });
    }
});

app.get('/api/historical-stock-data', async (req, res) => {
    try {
        const historicalStockData = await HistoricalStockData.findAll({
            limit: 200,
        });
        res.json(historicalStockData);
    } catch (error) {
        console.error('Error fetching historical stock data:', error);
        res.status(500).json({ error: 'Failed to fetch historical stock data' });
    }
});

app.get('/api/stock-codes', async (req: Request, res: Response) => {
    try {
        // Fetch distinct stock symbols from StockData table
        const stockSymbols = await StockData.findAll({
            attributes: ['stockSymbol'],
            group: ['stockSymbol']  // Group by stockSymbol to get unique values
        });

        // Fetch distinct publisher codes from HistoricalStockData table
        const publisherCodes = await HistoricalStockData.findAll({
            attributes: ['publisherCode'],
            group: ['publisherCode']  // Group by publisherCode to get unique values
        });

        // Send back both stock symbols and publisher codes
        res.json({
            stockSymbols: stockSymbols.map(item => item.stockSymbol),
            publisherCodes: publisherCodes.map(item => item.publisherCode)
        });
    } catch (error) {
        console.error('Error fetching stock codes:', error);
        res.status(500).json({ error: 'Failed to fetch stock codes' });
    }
});



// In your express routes for stock data
app.get('/api/stock-data', async (req, res) => {
    const { code } = req.query;

    try {
        const stockData = await StockData.findAll({
            where: { stockSymbol: code },
            limit: 2000,
        });
        res.json(stockData);
    } catch (error) {
        console.error('Error fetching stock data:', error);
        res.status(500).json({ error: 'Failed to fetch stock data' });
    }
});

app.get('/api/historical-stock-data', async (req, res) => {
    const { code } = req.query;


    try {
        const historicalStockData = await HistoricalStockData.findAll({
            where: { publisherCode: code.toString() },
            limit: 2000,
        });
        res.json(historicalStockData);
    } catch (error) {
        console.error('Error fetching historical stock data:', error);
        res.status(500).json({ error: 'Failed to fetch historical stock data' });
    }
});
