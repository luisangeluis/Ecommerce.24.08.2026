import { CartResponseDto } from "../cart.dto";

export interface CartServiceInterface {
    getCart(userId: string): Promise<CartResponseDto>
}