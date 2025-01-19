"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_typescript_1 = require("sequelize-typescript"); // Ensure this import is present
var StockData = function () {
    var _classDecorators = [(0, sequelize_typescript_1.Table)({ tableName: 'stock_data', timestamps: true })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = sequelize_typescript_1.Model;
    var _datePublished_decorators;
    var _datePublished_initializers = [];
    var _datePublished_extraInitializers = [];
    var _priceLastTransaction_decorators;
    var _priceLastTransaction_initializers = [];
    var _priceLastTransaction_extraInitializers = [];
    var _minPrice_decorators;
    var _minPrice_initializers = [];
    var _minPrice_extraInitializers = [];
    var _maxPrice_decorators;
    var _maxPrice_initializers = [];
    var _maxPrice_extraInitializers = [];
    var _averagePrice_decorators;
    var _averagePrice_initializers = [];
    var _averagePrice_extraInitializers = [];
    var _promotionPercentage_decorators;
    var _promotionPercentage_initializers = [];
    var _promotionPercentage_extraInitializers = [];
    var _quantity_decorators;
    var _quantity_initializers = [];
    var _quantity_extraInitializers = [];
    var _turnoverBESTDenar_decorators;
    var _turnoverBESTDenar_initializers = [];
    var _turnoverBESTDenar_extraInitializers = [];
    var _totalTurnoverDenars_decorators;
    var _totalTurnoverDenars_initializers = [];
    var _totalTurnoverDenars_extraInitializers = [];
    var _stockSymbol_decorators;
    var _stockSymbol_initializers = [];
    var _stockSymbol_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var StockData = _classThis = /** @class */ (function (_super) {
        __extends(StockData_1, _super);
        function StockData_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.datePublished = __runInitializers(_this, _datePublished_initializers, void 0);
            _this.priceLastTransaction = (__runInitializers(_this, _datePublished_extraInitializers), __runInitializers(_this, _priceLastTransaction_initializers, void 0));
            _this.minPrice = (__runInitializers(_this, _priceLastTransaction_extraInitializers), __runInitializers(_this, _minPrice_initializers, void 0));
            _this.maxPrice = (__runInitializers(_this, _minPrice_extraInitializers), __runInitializers(_this, _maxPrice_initializers, void 0));
            _this.averagePrice = (__runInitializers(_this, _maxPrice_extraInitializers), __runInitializers(_this, _averagePrice_initializers, void 0));
            _this.promotionPercentage = (__runInitializers(_this, _averagePrice_extraInitializers), __runInitializers(_this, _promotionPercentage_initializers, void 0));
            _this.quantity = (__runInitializers(_this, _promotionPercentage_extraInitializers), __runInitializers(_this, _quantity_initializers, void 0));
            _this.turnoverBESTDenar = (__runInitializers(_this, _quantity_extraInitializers), __runInitializers(_this, _turnoverBESTDenar_initializers, void 0));
            _this.totalTurnoverDenars = (__runInitializers(_this, _turnoverBESTDenar_extraInitializers), __runInitializers(_this, _totalTurnoverDenars_initializers, void 0));
            _this.stockSymbol = (__runInitializers(_this, _totalTurnoverDenars_extraInitializers), __runInitializers(_this, _stockSymbol_initializers, void 0));
            _this.createdAt = (__runInitializers(_this, _stockSymbol_extraInitializers), __runInitializers(_this, _createdAt_initializers, void 0));
            _this.updatedAt = (__runInitializers(_this, _createdAt_extraInitializers), __runInitializers(_this, _updatedAt_initializers, void 0));
            __runInitializers(_this, _updatedAt_extraInitializers);
            return _this;
        }
        return StockData_1;
    }(_classSuper));
    __setFunctionName(_classThis, "StockData");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _datePublished_decorators = [(0, sequelize_typescript_1.Column)({ field: 'datePublished', type: sequelize_typescript_1.DataType.DATE })];
        _priceLastTransaction_decorators = [(0, sequelize_typescript_1.Column)({ field: 'priceLastTransaction', type: sequelize_typescript_1.DataType.DECIMAL(10, 0) })];
        _minPrice_decorators = [(0, sequelize_typescript_1.Column)({ field: 'minPrice', type: sequelize_typescript_1.DataType.DECIMAL(10, 0) })];
        _maxPrice_decorators = [(0, sequelize_typescript_1.Column)({ field: 'maxPrice', type: sequelize_typescript_1.DataType.DECIMAL(10, 0) })];
        _averagePrice_decorators = [(0, sequelize_typescript_1.Column)({ field: 'averagePrice', type: sequelize_typescript_1.DataType.DECIMAL(10, 0) })];
        _promotionPercentage_decorators = [(0, sequelize_typescript_1.Column)({ field: 'promotionPercentage', type: sequelize_typescript_1.DataType.DECIMAL(10, 0) })];
        _quantity_decorators = [(0, sequelize_typescript_1.Column)({ field: 'quantity', type: sequelize_typescript_1.DataType.INTEGER })];
        _turnoverBESTDenar_decorators = [(0, sequelize_typescript_1.Column)({ field: 'turnoverBESTDenar', type: sequelize_typescript_1.DataType.DECIMAL(10, 0) })];
        _totalTurnoverDenars_decorators = [(0, sequelize_typescript_1.Column)({ field: 'totalTurnoverDenars', type: sequelize_typescript_1.DataType.DECIMAL(10, 0) })];
        _stockSymbol_decorators = [(0, sequelize_typescript_1.Column)({ field: 'stockSymbol', type: sequelize_typescript_1.DataType.STRING })];
        _createdAt_decorators = [sequelize_typescript_1.CreatedAt, (0, sequelize_typescript_1.Column)({ field: 'created_at', type: sequelize_typescript_1.DataType.DATE })];
        _updatedAt_decorators = [sequelize_typescript_1.UpdatedAt, (0, sequelize_typescript_1.Column)({ field: 'updated_at', type: sequelize_typescript_1.DataType.DATE })];
        __esDecorate(null, null, _datePublished_decorators, { kind: "field", name: "datePublished", static: false, private: false, access: { has: function (obj) { return "datePublished" in obj; }, get: function (obj) { return obj.datePublished; }, set: function (obj, value) { obj.datePublished = value; } }, metadata: _metadata }, _datePublished_initializers, _datePublished_extraInitializers);
        __esDecorate(null, null, _priceLastTransaction_decorators, { kind: "field", name: "priceLastTransaction", static: false, private: false, access: { has: function (obj) { return "priceLastTransaction" in obj; }, get: function (obj) { return obj.priceLastTransaction; }, set: function (obj, value) { obj.priceLastTransaction = value; } }, metadata: _metadata }, _priceLastTransaction_initializers, _priceLastTransaction_extraInitializers);
        __esDecorate(null, null, _minPrice_decorators, { kind: "field", name: "minPrice", static: false, private: false, access: { has: function (obj) { return "minPrice" in obj; }, get: function (obj) { return obj.minPrice; }, set: function (obj, value) { obj.minPrice = value; } }, metadata: _metadata }, _minPrice_initializers, _minPrice_extraInitializers);
        __esDecorate(null, null, _maxPrice_decorators, { kind: "field", name: "maxPrice", static: false, private: false, access: { has: function (obj) { return "maxPrice" in obj; }, get: function (obj) { return obj.maxPrice; }, set: function (obj, value) { obj.maxPrice = value; } }, metadata: _metadata }, _maxPrice_initializers, _maxPrice_extraInitializers);
        __esDecorate(null, null, _averagePrice_decorators, { kind: "field", name: "averagePrice", static: false, private: false, access: { has: function (obj) { return "averagePrice" in obj; }, get: function (obj) { return obj.averagePrice; }, set: function (obj, value) { obj.averagePrice = value; } }, metadata: _metadata }, _averagePrice_initializers, _averagePrice_extraInitializers);
        __esDecorate(null, null, _promotionPercentage_decorators, { kind: "field", name: "promotionPercentage", static: false, private: false, access: { has: function (obj) { return "promotionPercentage" in obj; }, get: function (obj) { return obj.promotionPercentage; }, set: function (obj, value) { obj.promotionPercentage = value; } }, metadata: _metadata }, _promotionPercentage_initializers, _promotionPercentage_extraInitializers);
        __esDecorate(null, null, _quantity_decorators, { kind: "field", name: "quantity", static: false, private: false, access: { has: function (obj) { return "quantity" in obj; }, get: function (obj) { return obj.quantity; }, set: function (obj, value) { obj.quantity = value; } }, metadata: _metadata }, _quantity_initializers, _quantity_extraInitializers);
        __esDecorate(null, null, _turnoverBESTDenar_decorators, { kind: "field", name: "turnoverBESTDenar", static: false, private: false, access: { has: function (obj) { return "turnoverBESTDenar" in obj; }, get: function (obj) { return obj.turnoverBESTDenar; }, set: function (obj, value) { obj.turnoverBESTDenar = value; } }, metadata: _metadata }, _turnoverBESTDenar_initializers, _turnoverBESTDenar_extraInitializers);
        __esDecorate(null, null, _totalTurnoverDenars_decorators, { kind: "field", name: "totalTurnoverDenars", static: false, private: false, access: { has: function (obj) { return "totalTurnoverDenars" in obj; }, get: function (obj) { return obj.totalTurnoverDenars; }, set: function (obj, value) { obj.totalTurnoverDenars = value; } }, metadata: _metadata }, _totalTurnoverDenars_initializers, _totalTurnoverDenars_extraInitializers);
        __esDecorate(null, null, _stockSymbol_decorators, { kind: "field", name: "stockSymbol", static: false, private: false, access: { has: function (obj) { return "stockSymbol" in obj; }, get: function (obj) { return obj.stockSymbol; }, set: function (obj, value) { obj.stockSymbol = value; } }, metadata: _metadata }, _stockSymbol_initializers, _stockSymbol_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StockData = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StockData = _classThis;
}();
exports.default = StockData;
