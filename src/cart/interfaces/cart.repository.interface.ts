import Cart from "../cart.model";

export interface CartRepositoryInterface {
    getOrCreateCart(userId:string):Promise<[Cart , boolean]>
    getCart(userId: string): Promise<Cart | null>
    createCart(userId: string): Promise<Cart>
}