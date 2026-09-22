import { Optional } from "sequelize";
import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import User from "../users/user.model";
import CartItem from "../cartitems/cartItem.model";

export interface ProductAttributes {
    id: string;
    title: string;
    description: string;
    price: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductCreationAttributes
    extends Optional<ProductAttributes, "id" | "createdAt" | "updatedAt"> { }

@Table({
    tableName: "products"
})
export default class Product extends Model<ProductAttributes, ProductCreationAttributes> {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        allowNull: false,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title!: string

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    description!: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    })
    price!: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    userId!: string;

    @Column({
        allowNull:false,
        type:DataType.DATE
    })
    declare createdAt: Date;

    @Column({
        allowNull:false,
        type:DataType.DATE
    })
    declare updatedAt: Date;

    //Association with User model
    @BelongsTo(() => User)
    user!: User;

    //Association with Cart-item model
    @HasMany(() => CartItem)
    cartItem!: CartItem[]
}