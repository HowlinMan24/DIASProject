import { Column, Model, Table, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript'; // Ensure this import is present

@Table({ tableName: 'stock_data', timestamps: true })
export default class StockData extends Model {

    @Column({ field: 'datePublished', type: DataType.DATE })  // Explicitly specify the type here
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

    @Column({ field: 'quantity', type: DataType.INTEGER  })
    quantity: number;

    @Column({ field: 'turnoverBESTDenar', type: DataType.DECIMAL(10, 0) })
    turnoverBESTDenar: number;

    @Column({ field: 'totalTurnoverDenars', type: DataType.DECIMAL(10, 0) })
    totalTurnoverDenars: number;

    @Column({ field: 'stockSymbol', type: DataType.STRING })
    stockSymbol: string;

    @CreatedAt
    @Column({ field: 'created_at',  type: DataType.DATE })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at',  type: DataType.DATE })
    updatedAt: Date;
}
