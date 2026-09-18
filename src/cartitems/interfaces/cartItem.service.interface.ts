import { CartItemResponseDto, createCartItemDto } from "../cartItem.dto";

export interface CartItemServiceInterface {
    addProductToCart(userId: string, data: createCartItemDto): Promise<CartItemResponseDto>
}