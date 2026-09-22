import express, { Application } from "express";
import { ProductContainer } from "./products/product.container";
import { AuthContainer } from "./auth/auth.container";
import { errorHandlerMiddleware } from "./common/middlewares/errorHandler.middleware";
import { CartContainer } from "./cart/cart.container";
import { CartItemContainer } from "./cartitems/cartItem.container";

export class App {
  private express: Application;

  private readonly productContainer: ProductContainer;
  private readonly authContainer: AuthContainer;
  private readonly cartContainer: CartContainer;
  private readonly cartItemContainer: CartItemContainer;

  constructor() {
    this.express = express();
    this.express.use(express.json());

    this.productContainer = new ProductContainer();
    this.authContainer = new AuthContainer();
    this.cartContainer = new CartContainer();
    this.cartItemContainer = new CartItemContainer();
    
    this.routes();

    this.express.use(errorHandlerMiddleware)
  }

  private routes() {
    this.express.use("/products", this.productContainer.getRouter());
    this.express.use("/auth",this.authContainer.getRouter());
    this.express.use("/cart",this.cartContainer.getRouter());
    this.express.use("/cart-items",this.cartItemContainer.getRouter());
  }

  listen(port: number = 3000) {
    this.express.listen(port);
    console.log("Server is running on port " + port);
  }
}
