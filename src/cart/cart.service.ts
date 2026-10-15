import { NotFoundError } from "../common/errors/notFound.error";
import { ResponseValidationError } from "../common/errors/responseValidationError";
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

        const result = cartResponseSchema.safeParse(plainCart);

        if(!result.success) throw new ResponseValidationError(result.error);

        return result.data;
    }

}