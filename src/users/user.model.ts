import { Optional } from "sequelize";
import { Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import Product from "../products/product.model";

export interface UserAttributes{
    id:string;
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'>{}

@Table({
    tableName:"users"
})
export default class User extends Model<UserAttributes,UserCreationAttributes>{
    @PrimaryKey
    @Column({
        type:DataType.UUID,
        allowNull:false,
        defaultValue:DataType.UUIDV4
    })
    declare id:string;

    
    @Column({
        type:DataType.STRING,
        allowNull:false,
        field:"first_name"
    })
    firstName!:string;

    @Column({
        type:DataType.STRING,
        allowNull:false,
        field:"last_name"
    })
    lastName!:string;

    @Column({
        type:DataType.STRING,
        allowNull:false,
        unique:true
    })
    email!:string;

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    password!:string;

    //Association with Product model
    @HasMany(() => Product)
    products!:Product[];
}