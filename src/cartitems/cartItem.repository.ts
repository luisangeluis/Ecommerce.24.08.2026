import { LOCK, Transaction } from "sequelize";
import { CartResponseDto } from "../cart/cart.dto";
import Cart from "../cart/cart.model";
import { NotFoundError } from "../common/errors/notFound.error";
import Product from "../products/product.model";
import { CreateCartItemDto } from "./cartItem.dto";
import CartItem from "./cartItem.model";
import { CartItemRepositoryInterface } from "./interfaces/cartItem.repository.interface";
import { randomUUID } from "crypto";

export class CartItemRepository implements CartItemRepositoryInterface {
    constructor(private readonly cartItemModel: typeof CartItem,
    ) { }

    async getCartItem(cartItemId: string, t?: Transaction): Promise<CartItem | null> {
        return await this.cartItemModel.findByPk(cartItemId, {
            attributes: ["id", "quantity"],
            include: [
                {
                    model: Product,
                }
            ],
            transaction: t
        });
    }

    async getOrCreateCartItem(cartId: string, productId: string, t?: Transaction) {
        await this.cartItemModel.sequelize!.query(
            `INSERT INTO cart_items
            (id, cartId, productId, quantity, createdAt, updatedAt)
         VALUES
            (:id, :cartId, :productId, 1, NOW(), NOW())
         ON DUPLICATE KEY UPDATE
            quantity = quantity + 1,
            updatedAt = NOW()`,
            {
                replacements: { id: randomUUID(), cartId, productId },
                transaction: t
            }
        );
    }

    async getCartItemByUserIdCartItemId(userId: string, cartItemId: string, t?: Transaction,
        lock?: LOCK
    ) {
        const cartItem = await this.cartItemModel.findOne({
            where: { id: cartItemId },
            include: [{
                model: Cart,
                attributes: [],
                where: {
                    userId
                },
                required: true,

            }],
            transaction: t,
            // lock: Transaction.LOCK.UPDATE
            lock: t && lock ? lock : undefined
        })

        return cartItem;
    }

    async updateQuantity(cartItemId: string, quantity: number, t?: Transaction) {
        const [affectedRows] = await this.cartItemModel.update({ quantity }, {
            where: {
                id: cartItemId
            },
            transaction: t
        })

        if (!affectedRows)
            throw new NotFoundError(`Cart item with id ${cartItemId} not found`);
    }

    async emptyCart(cartId: string, t?: Transaction): Promise<number> {
        const emptiedCart = await this.cartItemModel.destroy({
            where: {
                id: cartId
            },
            transaction: t
        })

        return emptiedCart;
    }

    async deleteCartItem(cartItemId: string, t?: Transaction) {
        const deleted = await this.cartItemModel.destroy({
            where: {
                id: cartItemId,
            },
            transaction: t
        })

        return deleted;
    }

}