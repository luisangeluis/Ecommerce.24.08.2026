import { CreateCartItemDto } from "../cartItem.dto";
import CartItem from "../cartItem.model";

export interface CartItemRepositoryInterface {
    getCartItem(cartId: string, productId: string): Promise<CartItem | null>;
    getOrCreateCartItem(cartId: string, productId: string): Promise<[CartItem, boolean]>;
}