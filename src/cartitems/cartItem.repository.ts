import { Transaction } from "sequelize";
import { CartResponseDto } from "../cart/cart.dto";
import Cart from "../cart/cart.model";
import { NotFoundError } from "../common/errors/notFound.error";
import Product from "../products/product.model";
import { CreateCartItemDto } from "./cartItem.dto";
import CartItem from "./cartItem.model";
import { CartItemRepositoryInterface } from "./interfaces/cartItem.repository.interface";

export class CartItemRepository implements CartItemRepositoryInterface {
    constructor(private readonly cartItemModel: typeof CartItem,
    ) { }

    async getCartItem(cartItemId: string): Promise<CartItem | null> {
        return await this.cartItemModel.findByPk(cartItemId);
    }

    async getOrCreateCartItem(cartId: string, productId: string, t?: Transaction) {
        const response = await this.cartItemModel.findOrCreate({
            where: {
                productId,
                cartId
            },
            defaults: {
                productId,
                cartId,
                quantity: 1
            },
            attributes: ["id", "quantity"],
            include: [
                {
                    model: Product,
                }
            ],
            transaction: t
        });

        return response;
    }

    async updateQuantity(cartItemId: string, quantity: number) {
        const [cartItem] = await this.cartItemModel.increment("quantity", {
            by: quantity,
            where: {
                id: cartItemId
            }
        });

        return cartItem[0];
    }

    // async incrementQuantityByOne(cartId: string, cartItemId: string, t?: Transaction) {
    //     await this.cartItemModel.increment("quantity", {
    //         by: 1,
    //         where: {
    //             id: cartItemId,
    //             cartId
    //         },
    //         transaction: t
    //     });

    //     return this.cartItemModel.findByPk(
    //         cartItemId,
    //         {
    //             transaction: t
    //         }
    //     );
    // }

    async emptyCart(cartId: string): Promise<number> {
        const emptiedCart = await this.cartItemModel.destroy({
            where: {
                id: cartId
            }
        })

        return emptiedCart;
    }

    async deleteCartItem(cartId: string, cartItemId: string) {
        const deleted = await this.cartItemModel.destroy({
            where: {
                id: cartItemId,
                cartId
            }
        })

        return deleted;
    }





}