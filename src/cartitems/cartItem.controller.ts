import { Request, Response } from "express";
import { CartItemControllerInterface } from "./interfaces/cartItem.controller.interface";
import { CartItemServiceInterface } from "./interfaces/cartItem.service.interface";
import { CreateCartItemDto, UpdateCartItemDto } from "./cartItem.dto";
import { successResponse } from "../common/utils/successResponse";

export interface ParamsDictionary {
    id: string;
}

export class CartItemController implements CartItemControllerInterface {
    constructor(private readonly cartItemService: CartItemServiceInterface) { }

    addProductToCart = async (req: Request<{}, {}, CreateCartItemDto>, res: Response) => {
        const { id: userId } = req.user;
        const { productId } = req.body;
        const cartItem = await this.cartItemService.addProductToCart(userId, productId);

        return successResponse({
            res, data: cartItem, statusCode: 201
        })
    }
    //todo completar el controller
    updateQuantity = async (req: Request<{ id: string }, {}, UpdateCartItemDto>, res: Response) => {
        const { id: userId } = req.user;
        const { id } = req.params;
        const { quantity } = req.body
        const cartItem = await this.cartItemService.updateQuantity(userId, id, quantity);

        return successResponse({
            res, data: cartItem
        })
    }

}