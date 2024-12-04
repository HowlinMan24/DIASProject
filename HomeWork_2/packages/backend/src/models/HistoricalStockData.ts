import { Model, Column, Table, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'historical_stock_data', timestamps: true })
export default class HistoricalStockData extends Model<HistoricalStockData> {

    @Column({ field: 'publisherCode', type: DataType.STRING })
    publisherCode: string;

    @Column({ field: 'datePublished', type: DataType.DATE })
    datePublished: Date;

    @Column({ field: 'priceLastTransaction', type: DataType.DECIMAL(10, 0) })
    priceLastTransaction: number;

    @Column({ field: 'minPrice', type: DataType.DECIMAL(10, 0) })
    minPrice: number;

    @Column({ field: 'maxPrice', type: DataType.DECIMAL(10, 0) })
    maxPrice: number;

    @Column({ field: 'averagePrice', type: DataType.DECIMAL(10, 0) })
    averagePrice: number;

    @Column({ field: 'promotionPercentage', type: DataType.DECIMAL(10, 0) })
    promotionPercentage: number;

    @Column({ field: 'quantity', type: DataType.INTEGER })
    quantity: number;

    @Column({ field: 'turnoverBESTDenar', type: DataType.DECIMAL(10, 0) })
    turnoverBESTDenar: number;

    @Column({ field: 'totalTurnoverDenars', type: DataType.DECIMAL(10, 0) })
    totalTurnoverDenars: number;

    @CreatedAt
    @Column({ field: 'created_at', type: DataType.DATE })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at', type: DataType.DATE })
    updatedAt: Date;
}
