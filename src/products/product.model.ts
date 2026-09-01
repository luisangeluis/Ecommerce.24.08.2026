import { Optional } from "sequelize";
import { AllowNull, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

interface ProductAttributes{
    id:string;
    title:string;
    description:string;
    price:string;
}

interface ProductCreationAtrributes extends Optional<ProductAttributes,"id">{}

@Table({
    tableName:"products"
})
export default class Product extends Model<ProductAttributes,ProductCreationAtrributes>{
    @Column({
        primaryKey: true,
        type:DataType.STRING,
        allowNull:false,
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