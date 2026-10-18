import { CartResponseDto } from "../../cart/cart.dto";
import { CartItemResponseDto } from "../cartItem.dto";

export interface CartItemServiceInterface {
    addProductToCart(userId: string, productId: string): Promise<CartResponseDto>
    updateQuantity(userId: string, cartItemId: string, quantity: number): Promise<CartResponseDto>
    deleteCartItem(userId: string, cartItemId: string): Promise<CartResponseDto>
    emptyCart(userId: string): Promise<CartResponseDto>
}