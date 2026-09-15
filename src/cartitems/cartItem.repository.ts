import { CartResponseDto } from "../cart/cart.dto";
import Cart from "../cart/cart.model";
import Product from "../products/product.model";
import CartItem from "./cartItem.model";
import { CartItemRepositoryInterface } from "./interfaces/cartItem.repository.interface";

export class CartItemRepository implements CartItemRepositoryInterface {
    constructor(private readonly cartItemModel: typeof CartItem,
    ) { }

    async getOrCreateCartItem(cartId: string, productId: string) {
        const cartItem = await this.cartItemModel.findOrCreate({
            where: {
                cartId,
                productId
            },
            defaults: {
                productId,
                cartId,
                quantity: 1
            },
            include: {
                model: Product
            }
        })

        return cartItem
    }

}