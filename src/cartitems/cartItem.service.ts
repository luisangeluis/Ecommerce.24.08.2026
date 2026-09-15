import { NotFoundError } from "../common/errors/notFound.error";
import { CartItemRepositoryInterface } from "./interfaces/cartItem.repository.interface";
import { CartItemServiceInterface } from "./interfaces/cartItem.service.interface";
import { CartRepositoryInterface } from "../cart/interfaces/cart.repository.interface";
import { ProductRepositoryInterface } from "../products/interfaces/product.repository.interface";
import { CartItemResponseDto, cartItemResponseSchema } from "./cartItem.dto";

export class CartItemService implements CartItemServiceInterface {
    constructor(private readonly cartItemRepository: CartItemRepositoryInterface,
        private readonly cartRepository: CartRepositoryInterface,
        private readonly productRepository: ProductRepositoryInterface) { }

    async addProductToCart(userId: string, productId: string): Promise<CartItemResponseDto> {
        const [cart, created] = await this.cartRepository.getOrCreateCart(userId);

        const product = await this.productRepository.getProductById(productId);

        if (!product) throw new NotFoundError(`Product with id: ${productId} not found`);

        const [cartItem, createdItem] = await this.cartItemRepository.getOrCreateCartItem(cart.id, product.id);

        if(!createdItem) {
            cartItem.quantity+=1;
            await cartItem.save();
        }

        return cartItemResponseSchema.parse(cartItem);



    }
}