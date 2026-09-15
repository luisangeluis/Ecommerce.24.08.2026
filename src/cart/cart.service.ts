import { CartResponseDto, cartResponseSchema } from "./cart.dto";
import { CartRepositoryInterface } from "./interfaces/cart.repository.interface";
import { CartServiceInterface } from "./interfaces/cart.service.interface";

export class CartService implements CartServiceInterface {
    constructor(private readonly cartRepository: CartRepositoryInterface) { }

    async getCart(userId: string): Promise<CartResponseDto> {
        let cart = await this.cartRepository.getCart(userId);

        if (!cart) {
            cart = await this.cartRepository.createCart(userId);
        }

        return cartResponseSchema.parse({
            id: cart.id,
            userId: cart.userId,
            isActive: cart.isActive,
            items: cart.cartItems ?? []
        })
    }

}