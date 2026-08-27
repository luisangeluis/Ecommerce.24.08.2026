import { Optional } from "sequelize";
import { AllowNull, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

interface ProductAttributes{
    id:string;
    title:string;
}

interface ProductCreationAtrributes extends Optional<ProductAttributes,"id">{}

@Table({
    tableName:"products"
})
class Product extends Model<ProductAttributes,ProductCreationAtrributes>{
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
}