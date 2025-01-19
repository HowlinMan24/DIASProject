import { Model } from 'sequelize';
import { Column, Table, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'users',
    charset: 'utf8mb4',
})
export default class User extends Model<User> {

    @Column({
        allowNull: false,
        type: DataType.NUMBER, // Match STRING(255) from migration
    })
    declare id: number;

    @Column({
        allowNull: false,
        type: DataType.STRING(255), // Match STRING(255) from migration
    })
    declare username: string;

    @Column({
        allowNull: false,
        type: DataType.STRING(255), // Match STRING(255) from migration
    })
    declare password: string;

    @Column({
        allowNull: false,
        type: DataType.STRING(255), // Match STRING(255) from migration
    })
    declare email: string;

    @Column({
        type: DataType.DATE, // Map to created_at
        field: 'created_at',
    })
    declare created_at: Date;

    @Column({
        type: DataType.DATE, // Map to updated_at
        field: 'updated_at',
    })
    declare updated_at: Date;
}
