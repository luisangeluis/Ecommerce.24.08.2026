import { CartItemController } from "../cartitems/cartItem.controller";
import { CartItemControllerInterface } from "../cartitems/interfaces/cartItem.controller.interface";
import { CartController } from "./cart.controller";
import Cart from "./cart.model";
import { CartRepository } from "./cart.repository";
import { CartRouter } from "./cart.router";
import { CartService } from "./cart.service";
import { CartControllerInterface } from "./interfaces/cart.controller.interface";
import { CartRepositoryInterface } from "./interfaces/cart.repository.interface";
import { CartServiceInterface } from "./interfaces/cart.service.interface";

export class CartContainer {
    private readonly cartRepository: CartRepositoryInterface;
    private readonly cartService:CartServiceInterface;
    private readonly cartController: CartControllerInterface;
    private readonly cartRouter: CartRouter;

    constructor() {
        this.cartRepository = new CartRepository(Cart);
        this.cartService = new CartService(this.cartRepository);    
        this.cartController = new CartController(this.cartService);
        this.cartRouter = new CartRouter(this.cartController,);        
    }

    getRouter(){
        return this.cartRouter.getRouter();
    }
}