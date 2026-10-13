import Cart from "./cart.model";
import { CartRepositoryInterface } from "./interfaces/cart.repository.interface";
import CartItem from "../cartitems/cartItem.model";
import Product from "../products/product.model";
import { Transaction } from "sequelize";

export class CartRepository implements CartRepositoryInterface {
    constructor(private readonly cartModel: typeof Cart) { }

    async getOrCreateCart(userId: string, t: Transaction) {
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
            }],
            transaction: t
        });
    }

    async getCart(userId: string, t?: Transaction) {
        const cart = await this.cartModel.findOne({
            where: { userId },
            include: [{
                model: CartItem,
                attributes: ["id", "quantity"],
                include: [{
                    model: Product,
                    attributes: ["id", "title", "description", "price", "userId"]
                }]
            }],
            transaction: t
        })

        return cart;
    }

    async cartExists(userId: string, t?: Transaction) {
        const cart = await this.cartModel.findByPk(userId, {
            attributes: ["id"],
            transaction: t
        });

        return !!cart;
    }

    async createCart(userId: string) {
        return await this.cartModel.create({
            userId
        })
    }


}