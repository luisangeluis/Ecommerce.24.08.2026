import Cart from "./cart.model";
import { CartRepositoryInterface } from "./interfaces/cart.repository.interface";
import CartItem from "../cartitems/cartItem.model";
import Product from "../products/product.model";

export class CartRepository implements CartRepositoryInterface {
    constructor(private readonly cartModel: typeof Cart) { }

    async getOrCreateCart(userId: string) {
        return await this.cartModel.findOrCreate({
            where: { userId },
            defaults: {
                userId
            },
            include: [{
                model: CartItem,
                attributes: ["id", "quantity"],
                include: [{
                    model: Product,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                }]
            }]
        });
    }

    async getCart(userId: string) {
        const cart = await this.cartModel.findOne({
            where: { userId },
            include: [{
                model: CartItem,
                attributes: ["id", "quantity"],
                include: [{
                    model: Product,
                    attributes: ["id", "title", "description", "price", "status", "userId"]
                }]
            }]
        })

        return cart;
    }

    async createCart(userId: string) {
        return await this.cartModel.create({
            userId
        })
    }
}