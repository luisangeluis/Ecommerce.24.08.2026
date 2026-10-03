import { Transaction } from "sequelize";
import Cart from "../cart.model";

export interface CartRepositoryInterface {
    getOrCreateCart(userId: string, t: Transaction): Promise<[Cart, boolean]>
    getCart(userId: string): Promise<Cart | null>
    createCart(userId: string): Promise<Cart>
}