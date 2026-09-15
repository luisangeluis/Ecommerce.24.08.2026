import { Optional, UUID } from "sequelize";
import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Model, NotNull, PrimaryKey, Table, Unique } from "sequelize-typescript";
import User from "../users/user.model";
import CartItem from "../cartitems/cartItem.model";

interface CartAttributes {
    id: string;
    userId: string;
    isActive?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface CartCreationAttributes
    extends Optional<CartAttributes, "id" | "createdAt" | "updatedAt"> { }

@Table({
    tableName: "carts"
})
export default class Cart extends Model<CartAttributes, CartCreationAttributes> {
    @PrimaryKey
    @AllowNull(false)
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUID
    })
    declare id: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Unique(true)
    @Column({
        type: DataType.UUID
    })
    userId!: string;

    @AllowNull(false)
    @Default(false)
    @Column({
        type: DataType.BOOLEAN
    })
    isActive?: boolean

    //Association with User model
    @BelongsTo(() => User)
    user!: User

    //Association with CartItem model
    @HasMany(() => CartItem)
    cartItems!: CartItem[]
}