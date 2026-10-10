import { Transaction } from "sequelize";
import CartItem from "../cartItem.model";

export interface CartItemRepositoryInterface {
    getCartItem(cartItemId:string, t?: Transaction): Promise<CartItem | null>;
    getOrCreateCartItem(cartId: string, productId: string, t?: Transaction): Promise<[CartItem, boolean]>;
    // incrementQuantityByOne(cartId:string,cartItemId:string,t?:Transaction):Promise<CartItem | null>;
    updateQuantity(cartItemId: string, quantity: number): Promise<CartItem>;
    emptyCart(cartId: string): Promise<number>;
    deleteCartItem(cartId: string, cartItemId: string): Promise<number>
}