import Cart from "../cart/cart.model";
import { CartRepository } from "../cart/cart.repository";
import { CartRepositoryInterface } from "../cart/interfaces/cart.repository.interface";
import { ProductRepositoryInterface } from "../products/interfaces/product.repository.interface";
import Product from "../products/product.model";
import { ProductRepository } from "../products/product.repository";
import { CartItemController } from "./cartItem.controller";
import CartItem from "./cartItem.model";
import { CartItemRepository } from "./cartItem.repository";
import { CartItemRouter } from "./cartItem.router";
import { CartItemService } from "./cartItem.service";
import { CartItemControllerInterface } from "./interfaces/cartItem.controller.interface";
import { CartItemRepositoryInterface } from "./interfaces/cartItem.repository.interface";
import { CartItemServiceInterface } from "./interfaces/cartItem.service.interface";

export class CartItemContainer {
    private readonly cartRepository: CartRepositoryInterface;
    private readonly cartItemRepository: CartItemRepositoryInterface;
    private readonly productRepository: ProductRepositoryInterface;
    private readonly cartItemService: CartItemServiceInterface;
    private readonly cartItemController: CartItemControllerInterface;
    private readonly cartItemRouter: CartItemRouter;

    constructor() {
        this.cartRepository = new CartRepository(Cart);
        this.cartItemRepository = new CartItemRepository(CartItem);
        this.productRepository = new ProductRepository(Product);
        this.cartItemService = new CartItemService(this.cartItemRepository, this.cartRepository,
            this.productRepository
        );
        this.cartItemController = new CartItemController(this.cartItemService);
        this.cartItemRouter = new CartItemRouter(this.cartItemController);
    }

    getRouter() {
        return this.cartItemRouter.getRouter();
    }
}