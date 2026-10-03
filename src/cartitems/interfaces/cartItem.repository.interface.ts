import { Transaction } from "sequelize";
import CartItem from "../cartItem.model";

export interface CartItemRepositoryInterface {
    getCartItem(cartId: string, productId: string): Promise<CartItem | null>;
    getOrCreateCartItem(cartId: string, productId: string, t?: Transaction): Promise<[CartItem, boolean]>;
    deleteCartItem(cartId: string, cartItemId: string): Promise<number>
    emptyCart(cartId: string): Promise<number>;
}