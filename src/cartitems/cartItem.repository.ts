import { CartResponseDto } from "../cart/cart.dto";
import Cart from "../cart/cart.model";
import Product from "../products/product.model";
import { CreateCartItemDto } from "./cartItem.dto";
import CartItem from "./cartItem.model";
import { CartItemRepositoryInterface } from "./interfaces/cartItem.repository.interface";

export class CartItemRepository implements CartItemRepositoryInterface {
    constructor(private readonly cartItemModel: typeof CartItem,
    ) { }

    async getCartItem(cartId: string, productId: string) {
        const cartItem = await this.cartItemModel.findOne({
            where: {
                productId,
                cartId
            }
        });

        return cartItem;
    }

    async getOrCreateCartItem(cartId: string, productId: string) {
        const response = await this.cartItemModel.findOrCreate({
            where: {
                productId,
                cartId
            },
            defaults: {
                productId,
                cartId,
                quantity: 1
            }
        });

        return response;
    }

}