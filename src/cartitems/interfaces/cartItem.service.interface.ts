import { CartItemResponseDto } from "../cartItem.dto";

export interface CartItemServiceInterface {
    addProductToCart(userId: string, productId: string): Promise<CartItemResponseDto>
}