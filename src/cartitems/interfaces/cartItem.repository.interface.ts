import CartItem from "../cartItem.model";

export interface CartItemRepositoryInterface {
    getOrCreateCartItem( cartId: string, productId: string): Promise<[CartItem,boolean]>
}