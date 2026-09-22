import { Optional } from "sequelize";
import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, HasOne, Max, Min, Model, PrimaryKey, Table } from "sequelize-typescript";
import Product from "../products/product.model";
import Cart from "../cart/cart.model";

export interface CartItemAttributes {
    id: string;
    productId: string;
    cartId: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface CartItemCreationAttributes extends Optional<CartItemAttributes,
    "id" | "createdAt" | "updatedAt"> { }

@Table({
    tableName: "cart_items"
})
export default class CartItem extends Model<CartItemAttributes, CartItemCreationAttributes> {
    @AllowNull(false)
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string;

    @ForeignKey(() => Product)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    productId!: string;

    @ForeignKey(() => Cart)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    cartId!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
            Min: 1,
            Max: 10
        }
    })
    quantity!: number;

    @Column({
        allowNull: false,
        type: DataType.DATE
    })
    declare createdAt: Date;

    @Column({
        allowNull: false,
        type: DataType.DATE
    })
    declare updatedAt: Date;

    //Association with Product model
    @BelongsTo(() => Product)
    product!: Product



    //Associationg with Cart model
    @BelongsTo(() => Cart)
    cart!: Cart;
}