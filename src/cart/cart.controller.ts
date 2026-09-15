import { Request, Response } from "express";
import { CartControllerInterface } from "./interfaces/cart.controller.interface";
import { CartServiceInterface } from "./interfaces/cart.service.interface";
import { successResponse } from "../common/utils/successResponse";
import { cartResponseSchema } from "./cart.dto";

export class CartController implements CartControllerInterface {
    constructor(private readonly cartService: CartServiceInterface) { }

    getCart = async (req: Request, res: Response) => {
        const { id: userId } = req.user;
        const cart = await this.cartService.getCart(userId);

        return successResponse({
            res, data: cart, schema: cartResponseSchema
        })
    }
}