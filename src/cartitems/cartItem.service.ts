import { NotFoundError } from "../common/errors/notFound.error";
import { CartItemRepositoryInterface } from "./interfaces/cartItem.repository.interface";
import { CartItemServiceInterface } from "./interfaces/cartItem.service.interface";
import { CartRepositoryInterface } from "../cart/interfaces/cart.repository.interface";
import { ProductRepositoryInterface } from "../products/interfaces/product.repository.interface";
import { CartItemResponseDto, cartItemResponseSchema, CreateCartItemDto } from "./cartItem.dto";
import { BadRequestError } from "../common/errors/badRequest.error";

export class CartItemService implements CartItemServiceInterface {
    constructor(private readonly cartItemRepository: CartItemRepositoryInterface,
        private readonly cartRepository: CartRepositoryInterface,
        private readonly productRepository: ProductRepositoryInterface) { }

    async addProductToCart(userId: string, productId: string): Promise<CartItemResponseDto> {
        const [cart] = await this.cartRepository.getOrCreateCart(userId);
        const product = await this.productRepository.getProductById(productId);

        if (!product) throw new NotFoundError(`Product with id: ${productId} not found`);

        const [cartItem, isCreatedCartItem] = await this.cartItemRepository.getOrCreateCartItem(cart.id, product.id);

        if (!isCreatedCartItem) {
            cartItem.quantity += 1;
            await cartItem.save();
        }

        const plainCartItem = cartItem.toJSON();

        return cartItemResponseSchema.parse(plainCartItem);
    }

    async updateQuantity(userId: string, cartItemId: string, quantity: number): Promise<CartItemResponseDto> {
        const cart = await this.cartRepository.getCart(userId);

        if (!cart) {
            throw new NotFoundError("Cart not found");
        }

        const cartItem = cart.cartItems.find(item => item.id === cartItemId);

        if (!cartItem) throw new NotFoundError(`Cart item with id ${cartItemId} not found`);

        cartItem.quantity = quantity;

        await cartItem.save();

        const plainCarItem = cartItem.toJSON();

        return cartItemResponseSchema.parse(plainCarItem);
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