import { CartResponseDto } from "../cart/cart.dto";
import Cart from "../cart/cart.model";
import Product from "../products/product.model";
import { CreateCartItemDto } from "./cartItem.dto";
import CartItem from "./cartItem.model";
import { CartItemRepositoryInterface } from "./interfaces/cartItem.repository.interface";

export class CartItemRepository implements CartItemRepositoryInterface {
    constructor(private readonly cartItemModel: typeof CartItem,
    ) { }

    //TODO crear un endpoint para crear el cartItem y otro endpoint para modificar su cantidad
    async getOrCreateCartItem(cartId: string, data: CreateCartItemDto) {
        const [cartItem, isCreated] = await this.cartItemModel.findOrCreate({
            where: {
                cartId,
                productId: data.productId
            },
            defaults: {
                productId: data.productId,
                cartId,
                quantity: data.quantity
            },
            include: {
                model: Product
            }
        })

        if(!isCreated){
            cartItem.quantity = data.quantity;
            await cartItem.save();
        }

        return cartItem
    }

}