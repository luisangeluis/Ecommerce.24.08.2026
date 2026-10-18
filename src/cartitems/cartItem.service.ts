import { NotFoundError } from "../common/errors/notFound.error";
import { CartItemRepositoryInterface } from "./interfaces/cartItem.repository.interface";
import { CartItemServiceInterface } from "./interfaces/cartItem.service.interface";
import { CartRepositoryInterface } from "../cart/interfaces/cart.repository.interface";
import { ProductRepositoryInterface } from "../products/interfaces/product.repository.interface";
import { CartItemResponseDto, cartItemResponseSchema, CreateCartItemDto } from "./cartItem.dto";
import { LOCK, Transaction } from "sequelize";
import { getTransaction } from "../database/connectDb";
import sequelize from "../database/sequelize.config";
import { withTransaction } from "../common/helpers/withTransaction.helper";
import { CartResponseDto, cartResponseSchema } from "../cart/cart.dto";
import { ResponseValidationError } from "../common/errors/responseValidationError";
import { validatedResponse } from "../common/utils/validatedResponse";

export class CartItemService implements CartItemServiceInterface {
    constructor(private readonly cartItemRepository: CartItemRepositoryInterface,
        private readonly cartRepository: CartRepositoryInterface,
        private readonly productRepository: ProductRepositoryInterface) { }

    async addProductToCart(userId: string, productId: string) {
        const [cart] = await this.cartRepository.getOrCreateCart(userId);

        return withTransaction(async (t) => {
            const product = await this.productRepository.getProductById(productId, t);

            if (!product) {
                throw new NotFoundError(`Product with id ${productId} not found`);
            }

            await this.cartItemRepository.getOrCreateCartItem(cart.id, productId, t);

            const [updatedCart] = await this.cartRepository.getOrCreateCart(userId, t);

            return validatedResponse(updatedCart, cartResponseSchema);
        });
    }

    async updateQuantity(userId: string, cartItemId: string, quantity: number) {
        return withTransaction(async (t) => {
            const cartItem = await this.cartItemRepository.getCartItemByUserIdCartItemId(userId,
                cartItemId, t, t.LOCK.UPDATE);


            if (!cartItem) throw new NotFoundError(`CartItem with id:${cartItemId} not found`);

            await this.cartItemRepository.updateQuantity(cartItem.id, quantity, t);

            const [cart] = await this.cartRepository.getOrCreateCart(userId, t);

            return validatedResponse(cart, cartResponseSchema);
        })
    }

    async deleteCartItem(userId: string, cartItemId: string): Promise<CartResponseDto> {
        return withTransaction(async (t) => {
            const cartItem = await this.cartItemRepository.getCartItemByUserIdCartItemId(
                userId, cartItemId, t, t.LOCK.UPDATE);
            if (!cartItem)
                throw new NotFoundError(`Cart item with id${cartItemId} not found`);

            await this.cartItemRepository.deleteCartItem(cartItem.id, t);

            const [cart] = await this.cartRepository.getOrCreateCart(userId, t);

            return validatedResponse(cart, cartResponseSchema);
        })
    }

    async emptyCart(userId: string): Promise<CartResponseDto> {
        const [cart, isCreated] = await this.cartRepository.getOrCreateCart(userId);

        return withTransaction(async (t) => {
            if (!isCreated)
                await this.cartItemRepository.emptyCart(cart.id, t);


            return validatedResponse(cart, cartResponseSchema);
        });
    }
}