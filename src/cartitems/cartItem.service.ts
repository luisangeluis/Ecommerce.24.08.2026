import { NotFoundError } from "../common/errors/notFound.error";
import { CartItemRepositoryInterface } from "./interfaces/cartItem.repository.interface";
import { CartItemServiceInterface } from "./interfaces/cartItem.service.interface";
import { CartRepositoryInterface } from "../cart/interfaces/cart.repository.interface";
import { ProductRepositoryInterface } from "../products/interfaces/product.repository.interface";
import { CartItemResponseDto, cartItemResponseSchema, CreateCartItemDto } from "./cartItem.dto";
import { Transaction } from "sequelize";
import { getTransaction } from "../database/connectDb";
import sequelize from "../database/sequelize.config";
import { withTransaction } from "../common/helpers/withTransaction.helper";

export class CartItemService implements CartItemServiceInterface {
    constructor(private readonly cartItemRepository: CartItemRepositoryInterface,
        private readonly cartRepository: CartRepositoryInterface,
        private readonly productRepository: ProductRepositoryInterface) { }

    async addProductToCart(userId: string, productId: string): Promise<CartItemResponseDto> {
        return withTransaction(async (t) => {
            const [cart] = await this.cartRepository.getOrCreateCart(userId, t);
            const product = await this.productRepository.getProductById(productId, t);

            if (!product) throw new NotFoundError(`Product with id: ${productId} not found`);

            const [cartItem, iscreatedCartItem] =
                await this.cartItemRepository.getOrCreateCartItem(cart.id, productId, t);

            if (!iscreatedCartItem) {
                await cartItem.increment("quantity", { by: 1, transaction: t });

                await cartItem.reload({ transaction: t });
            }

            const plainCartItem = cartItem.toJSON();
            console.log("plainCartItem", plainCartItem);

            return cartItemResponseSchema.parse(plainCartItem);
        });
    }

    async updateQuantity(cartItemId: string, quantity: number): Promise<CartItemResponseDto> {
        const cartItem = await this.cartItemRepository.getCartItem(cartItemId);
        if (!cartItem)
            throw new NotFoundError(`Cart item with id ${cartItemId} not found`);

        const updatedCartItem = await this.cartItemRepository.updateQuantity(cartItemId, quantity);

        if (!updatedCartItem) {
            throw new NotFoundError(`Cart item with id ${cartItemId} not found`);
        }

        const plainCartItem = updatedCartItem.toJSON();

        return cartItemResponseSchema.parse(plainCartItem);
    }

    async deleteCartItem(userId: string, cartItemId: string): Promise<void> {
        const cart = await this.cartRepository.getCart(userId);

        if (!cart) {
            throw new NotFoundError("Cart item not found");
        }

        const deleted = await this.cartItemRepository.deleteCartItem(cart.id, cartItemId);

        if (!deleted) {
            throw new NotFoundError("Cart item not found");
        }

    }

    async emptyCart(userId: string): Promise<void> {
        const cart = await this.cartRepository.getCart(userId);

        if (!cart) throw new NotFoundError("Cart not found");

        await this.cartItemRepository.emptyCart(cart.id);
    }
}