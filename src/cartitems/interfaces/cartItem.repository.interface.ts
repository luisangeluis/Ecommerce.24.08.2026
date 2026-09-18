import { CreateCartItemDto } from "../cartItem.dto";
import CartItem from "../cartItem.model";

export interface CartItemRepositoryInterface {
    getOrCreateCartItem( cartId: string, data: CreateCartItemDto): Promise<CartItem>
}