import { Request, Response } from "express";
import { CartItemControllerInterface } from "./interfaces/cartItem.controller.interface";
import { CartItemServiceInterface } from "./interfaces/cartItem.service.interface";
import { CreateCartItemDto } from "./cartItem.dto";
import { successResponse } from "../common/utils/successResponse";

export interface CartItemParams{
    id:string;
}

export class CartItemController implements CartItemControllerInterface {
    constructor(private readonly cartItemService: CartItemServiceInterface) { }

    addProductToCart = (req: Request<{}, {}, CreateCartItemDto>, res: Response) => {
        const { id: userId } = req.user;
        const { productId } = req.body;
        const cartItem = this.cartItemService.addProductToCart(userId, productId);

        return successResponse({
            res, data: cartItem, statusCode: 201
        })
    }
    //todo completar el controller
    updateQuantity = (req: Request<CartItemParams,{},>, res: Response) => {
        const { id: userId } = req.user;
        const {cartItemId} req.params;
        const cartItem = await cartItem.find
    }

}