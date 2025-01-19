"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var bcrypt_1 = require("bcrypt");
var sequelize_typescript_1 = require("sequelize-typescript");
var StockData_1 = require("../models/StockData");
var HistoricalStockData_1 = require("../models/HistoricalStockData");
var body_parser_1 = require("body-parser");
var jwtUtils_1 = require("../utils/jwtUtils");
var User_1 = require("../models/User");
var sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'mysql',
    database: 'stocks',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Makedonija.2023',
    models: [HistoricalStockData_1.default, StockData_1.default],
    logging: console.log
});
sequelize.authenticate().then(function () {
    console.log('Database connection established successfully.');
}).catch(function (err) {
    console.error('Database connection failed:', err);
});
var port = 3600;
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(body_parser_1.default.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, TimezoneOffset");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
app.use(express_1.default.json());
app.use(function (req, res, next) {
    console.log("Received ".concat(req.method, " request for ").concat(req.url));
    next();
});
app.post('/api/create-user', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, password, hashedPassword, user, activationToken, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("COmes to backend");
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                console.log("Comes to create user end point");
                _a = req.body, username = _a.username, email = _a.email, password = _a.password;
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 2:
                hashedPassword = _b.sent();
                return [4 /*yield*/, User_1.default.create({
                        username: username,
                        email: email,
                        password: hashedPassword,
                    })];
            case 3:
                user = _b.sent();
                activationToken = (0, jwtUtils_1.createToken)(user);
                res.status(201).json({
                    user: user,
                    token: activationToken,
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.error(error_1);
                next(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.post('/api/login', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, isPasswordValid, token, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, User_1.default.findOne({ where: { email: req.body.email } })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new Error("Invalid credentials");
                }
                return [4 /*yield*/, (0, jwtUtils_1.comparePassword)(req.body.password, user.password)];
            case 2:
                isPasswordValid = _a.sent();
                if (!isPasswordValid) {
                    throw new Error("Invalid credentials");
                }
                token = (0, jwtUtils_1.createToken)(user);
                res.status(200).json({
                    user: user.dataValues,
                    token: token,
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error(error_2);
                next(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/confirm/:token', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var decodedToken, user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, jwtUtils_1.getParsedToken)(req.params.token)];
            case 1:
                decodedToken = _a.sent();
                if (!decodedToken) {
                    res.status(400).json({ message: 'Invalid Token' });
                }
                return [4 /*yield*/, User_1.default.findByPk(decodedToken.id)];
            case 2:
                user = _a.sent();
                if (!user) {
                    res.status(400).json({ message: 'Invalid User' });
                }
                res.status(200).json({ message: 'User has been confirmed' });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.error(error_3);
                next(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/stock-data', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var stockData, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, StockData_1.default.findAll({
                        limit: 200,
                    })];
            case 1:
                stockData = _a.sent();
                res.json(stockData);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error('Error fetching stock data:', error_4);
                res.status(500).json({ error: 'Failed to fetch stock data' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/api/historical-stock-data', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var historicalStockData, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, HistoricalStockData_1.default.findAll({
                        limit: 200,
                    })];
            case 1:
                historicalStockData = _a.sent();
                res.json(historicalStockData);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error('Error fetching historical stock data:', error_5);
                res.status(500).json({ error: 'Failed to fetch historical stock data' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/api/stock-codes', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var stockSymbols, publisherCodes, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, StockData_1.default.findAll({
                        attributes: ['stockSymbol'],
                        group: ['stockSymbol']
                    })];
            case 1:
                stockSymbols = _a.sent();
                return [4 /*yield*/, HistoricalStockData_1.default.findAll({
                        attributes: ['publisherCode'],
                        group: ['publisherCode']
                    })];
            case 2:
                publisherCodes = _a.sent();
                res.json({
                    stockSymbols: stockSymbols.map(function (item) { return item.stockSymbol; }),
                    publisherCodes: publisherCodes.map(function (item) { return item.publisherCode; })
                });
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                console.error('Error fetching stock codes:', error_6);
                res.status(500).json({ error: 'Failed to fetch stock codes' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/stock-data', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var code, stockData, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = req.query.code;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, StockData_1.default.findAll({
                        where: { stockSymbol: code },
                        limit: 2000,
                    })];
            case 2:
                stockData = _a.sent();
                res.json(stockData);
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                console.error('Error fetching stock data:', error_7);
                res.status(500).json({ error: 'Failed to fetch stock data' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/api/historical-stock-data', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var code, historicalStockData, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = req.query.code;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, HistoricalStockData_1.default.findAll({
                        where: { publisherCode: code.toString() },
                        limit: 2000,
                    })];
            case 2:
                historicalStockData = _a.sent();
                res.json(historicalStockData);
                return [3 /*break*/, 4];
            case 3:
                error_8 = _a.sent();
                console.error('Error fetching historical stock data:', error_8);
                res.status(500).json({ error: 'Failed to fetch historical stock data' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/', function (req, res) {
    res.send('Hello, TypeScript + Node.js + Express!');
});
app.get('/hello', function (req, res) {
    var message = req.query.message || process.env.SERVICE_MESSAGE || 'Hello from the Auth Service!';
    console.log("Message: ".concat(message));
    res.send(message);
});
app.listen(port, '0.0.0.0', function () {
    console.log("Server is running on http://localhost:".concat(port));
});
app.get('/health', function (req, res) {
    res.status(200).json({ message: 'Service is healthy' });
});
