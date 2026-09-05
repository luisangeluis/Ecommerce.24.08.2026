import express, { Application } from "express";
import { ProductContainer } from "./products/product.container";
import { AuthContainer } from "./auth/auth.container";

export class App {
  private express: Application;

  private readonly productContainer: ProductContainer;
  private readonly authContainer: AuthContainer;

  constructor() {
    this.express = express();
    this.express.use(express.json());

    this.productContainer = new ProductContainer();
    this.authContainer = new AuthContainer();
    
    this.routes();
  }

  private routes() {
    this.express.use("/products", this.productContainer.getRouter());
    this.express.use("/auth",this.authContainer.getRouter())
    // this.express.use("/", (req, res) =>
    //   res.json({ message: "api funcionando" })
    // );
  }

  listen(port: number = 3000) {
    this.express.listen(port);
    console.log("Server is running on port " + port);
  }
}
