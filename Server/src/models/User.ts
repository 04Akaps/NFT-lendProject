import { Model, Column, DataType, Table} from "sequelize-typescript";

@Table({
    timestamps : false,
    tableName : "User"
})

export class User extends Model {
    @Column({
        type : DataType.STRING,
        allowNull : false
    })
    googleId! : string;

    @Column({
        type : DataType.STRING,
        allowNull : false
    })
    googleEmail! : string;

    @Column({
        type : DataType.STRING,
        defaultValue : "0x0"
    })
    walletAddress! : string;

    
}