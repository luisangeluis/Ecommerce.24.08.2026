import { CartItemResponseDto } from "../cartItem.dto";

export interface CartItemServiceInterface {
    addProductToCart(userId: string, productId: string): Promise<CartItemResponseDto>
    updateQuantity(userId: string, cartItemId: string, quantity: number): Promise<CartItemResponseDto>
    deleteCartItem(userId: string, cartItemId: string): Promise<void>
}