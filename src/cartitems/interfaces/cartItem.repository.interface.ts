import { LOCK, Transaction } from "sequelize";
import CartItem from "../cartItem.model";

export interface CartItemRepositoryInterface {
    getCartItem(cartItemId: string, t?: Transaction): Promise<CartItem | null>;
    getOrCreateCartItem(cartId: string, productId: string, t?: Transaction): Promise<void>;
    getCartItemByUserIdCartItemId(userId: string, cartItemId: string, t?: Transaction,lock?:LOCK): Promise<CartItem | null>;
    updateQuantity(cartItemId: string, quantity: number, t?: Transaction): Promise<void>;
    emptyCart(cartId: string,t?:Transaction): Promise<number>;
    deleteCartItem(cartItemId: string,t?:Transaction): Promise<number>
}