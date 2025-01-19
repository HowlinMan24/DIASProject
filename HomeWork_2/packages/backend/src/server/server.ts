import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import {Sequelize, SequelizeOptions} from 'sequelize-typescript';
import StockData from "../models/StockData";
import HistoricalStockData from "../models/HistoricalStockData";
import bodyParser from "body-parser";
import {comparePassword, createToken, getParsedToken} from "../utils/jwtUtils";
import User from "../models/User";

const sequelize = new Sequelize({
    dialect: 'mysql',
    database: 'stocks',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Makedonija.2023',
    models: [HistoricalStockData, StockData],
    logging: console.log
} as SequelizeOptions);

sequelize.authenticate().then(() => {
    console.log('Database connection established successfully.');
}).catch((err) => {
    console.error('Database connection failed:', err);
});

const port: number = 3600;
const app = express();
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'] })
);
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, TimezoneOffset");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
app.use(express.json())
app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});

app.post('/api/create-user', async (req: Request, res: Response, next: NextFunction) => {
    console.log("COmes to backend")
    try {
        console.log("Comes to create user end point")
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
        });

        const activationToken = createToken(user);
        res.status(201).json({
            user: user,
            token: activationToken,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

app.post('/api/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await comparePassword(req.body.password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }
        const token = createToken(user);
        res.status(200).json({
            user: user.dataValues,
            token,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

app.get('/api/confirm/:token', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const decodedToken = await getParsedToken(req.params.token);
        if (!decodedToken) {
             res.status(400).json({ message: 'Invalid Token' });
        }
        const user = await User.findByPk(decodedToken.id);
        if (!user) {
             res.status(400).json({ message: 'Invalid User' });
        }
        res.status(200).json({ message: 'User has been confirmed' });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

app.get('/api/stock-data', async (req, res) => {
    try {
        const stockData = await StockData.findAll({
            limit: 200,
        });
        res.json(stockData);
    } catch (error) {
        console.error('Error fetching stock data:', error);
        res.status(500).json({error: 'Failed to fetch stock data'});
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
        res.status(500).json({error: 'Failed to fetch historical stock data'});
    }
});

app.get('/api/stock-codes', async (req: Request, res: Response) => {
    try {
        const stockSymbols = await StockData.findAll({
            attributes: ['stockSymbol'],
            group: ['stockSymbol']
        });
        const publisherCodes = await HistoricalStockData.findAll({
            attributes: ['publisherCode'],
            group: ['publisherCode']
        });
        res.json({
            stockSymbols: stockSymbols.map(item => item.stockSymbol),
            publisherCodes: publisherCodes.map(item => item.publisherCode)
        });
    } catch (error) {
        console.error('Error fetching stock codes:', error);
        res.status(500).json({error: 'Failed to fetch stock codes'});
    }
});

app.get('/api/stock-data', async (req, res) => {
    const {code} = req.query;
    try {
        const stockData = await StockData.findAll({
            where: {stockSymbol: code},
            limit: 2000,
        });
        res.json(stockData);
    } catch (error) {
        console.error('Error fetching stock data:', error);
        res.status(500).json({error: 'Failed to fetch stock data'});
    }
});

app.get('/api/historical-stock-data', async (req, res) => {
    const {code} = req.query;
    try {
        const historicalStockData = await HistoricalStockData.findAll({
            where: {publisherCode: code.toString()},
            limit: 2000,
        });
        res.json(historicalStockData);
    } catch (error) {
        console.error('Error fetching historical stock data:', error);
        res.status(500).json({error: 'Failed to fetch historical stock data'});
    }
});

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript + Node.js + Express!');
});

app.get('/hello', (req, res) => {
    const message = req.query.message || process.env.SERVICE_MESSAGE || 'Hello from the Auth Service!';
    console.log(`Message: ${message}`);
    res.send(message);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Service is healthy' });
});
