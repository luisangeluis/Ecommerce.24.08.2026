import { Transaction } from "sequelize";
import Cart from "../cart.model";

export interface CartRepositoryInterface {
    getOrCreateCart(userId: string, t?: Transaction): Promise<[Cart, boolean]>
    getCart(userId: string, t?: Transaction): Promise<Cart | null>
    // cartExists(userId: string, t?: Transaction): Promise<boolean>
    createCart(userId: string): Promise<Cart>
    lockCart(cartId: string, t: Transaction): Promise<Cart | null>
}