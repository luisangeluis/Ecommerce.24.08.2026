import { Optional } from "sequelize";
import { AllowNull, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

export interface ProductAttributes{
    id:string;
    title:string;
    description:string;
    price:string;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes,"id">{}

@Table({
    tableName:"products"
})
export default class Product extends Model<ProductAttributes,ProductCreationAttributes>{
    @Column({
        primaryKey: true,
        type:DataType.UUID,
        allowNull:false,
        defaultValue:DataType.UUIDV4
    })
    declare id:string;

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    title!:string

    @Column({
        type:DataType.TEXT,
        allowNull:false
    })
    description!:string;

    @Column({
        type:DataType.DECIMAL(10,2),
        allowNull:false,
        validate:{
            min:0
        }
    })
    price!:string;
}