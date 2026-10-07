import { Request, Response } from "express";
import { CartItemControllerInterface } from "./interfaces/cartItem.controller.interface";
import { CartItemServiceInterface } from "./interfaces/cartItem.service.interface";
import { CreateCartItemDto, UpdateCartItemDto } from "./cartItem.dto";
import { successResponse } from "../common/utils/successResponse";
import { TypedRequest } from "../common/types/express";

export interface IdParams {
    id: string;
}

export class CartItemController implements CartItemControllerInterface {
    constructor(private readonly cartItemService: CartItemServiceInterface) { }

    addProductToCart = async (req: Request<{}, {}, CreateCartItemDto>, res: Response) => {
        const { id: userId } = req.user;
        const { productId } = req.body;
        console.log("userId", userId);
        console.log("productId", productId);
        const cartItem = await this.cartItemService.addProductToCart(userId, productId);

        return successResponse({
            res, data: cartItem, statusCode: 201
        })
    }
    //todo completar el controller
    updateQuantity = async (req: TypedRequest<IdParams, UpdateCartItemDto>, res: Response) => {
        const { id: userId } = req.user;
        const { id } = req.params;
        const { quantity } = req.body
        const cartItem = await this.cartItemService.updateQuantity(userId, quantity);

        return successResponse({
            res, data: cartItem
        })
    }

    //TODO create removeProduct from cart
    removeProductFromCart = async (req: Request<{ id: string }>, res: Response) => {
        const { id: userId } = req.user;
        const { id: cartItemId } = req.params;

        await this.cartItemService.deleteCartItem(userId, cartItemId);

        return successResponse({
            res, data: null, statusCode: 204
        })
    }

    emptyCart=async(req: TypedRequest, res: Response)=> {
        const { id: userId } = req.user;

        await this.cartItemService.emptyCart(userId);

        return successResponse({
            res,data:null,statusCode:204
        })
    }

}