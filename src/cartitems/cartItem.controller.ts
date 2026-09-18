import { Request } from "express";
import { CartItemControllerInterface } from "./interfaces/cartItem.controller.interface";
import { CartItemServiceInterface } from "./interfaces/cartItem.service.interface";
import { CreateCartItemDto } from "./cartItem.dto";

export class CartItemController implements CartItemControllerInterface {
    constructor(private readonly cartItemService: CartItemServiceInterface) { }

    addProductToCart = (req: Request<{},{},CreateCartItemDto>, res: Response) => {
        const { id: userId } = req.user;
        const data = req.body;
        const cartItem = this.cartItemService.addProductToCart(userId, data);

    }

}