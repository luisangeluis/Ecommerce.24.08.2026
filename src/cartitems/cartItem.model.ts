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
    tableName: "cart_items",
    indexes: [
        {
            name: "unique_cart_product",
            unique: true,
            fields: ["cartId", "productId"]
        }
    ]
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

    @Max(10)
    @Min(1)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 1
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