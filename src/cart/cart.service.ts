import { NotFoundError } from "../common/errors/notFound.error";
import { CartResponseDto, cartResponseSchema } from "./cart.dto";
import { CartRepositoryInterface } from "./interfaces/cart.repository.interface";
import { CartServiceInterface } from "./interfaces/cart.service.interface";

export class CartService implements CartServiceInterface {
    constructor(private readonly cartRepository: CartRepositoryInterface) { }

    async getCart(userId: string): Promise<CartResponseDto> {
        let cart = await this.cartRepository.getCart(userId);

        if (!cart) {
            throw new NotFoundError("Cart not found");
        }

        const plainCart = cart.toJSON();

        return cartResponseSchema.parse(plainCart);
    }

}