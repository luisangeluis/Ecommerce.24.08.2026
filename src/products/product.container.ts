import { ProductControllerInterface } from "./interfaces/product.controller.interface";
import { ProductRepositoryInterface } from "./interfaces/product.repository.interface";
import { ProductServiceInterface } from "./interfaces/product.service.interface";
import { ProductController } from "./product.controller";
import Product from "./product.model";
import { ProductRepository } from "./product.repository";
import { ProductRouter } from "./product.router";
import { ProductService } from "./product.service";

export class ProductContainer{
    private readonly productRepository:ProductRepositoryInterface;
    private readonly productService:ProductServiceInterface;
    private readonly productController:ProductControllerInterface;
    private readonly productRouter:ProductRouter;

    constructor() {
        this.productRepository = new ProductRepository(Product);
        this.productService = new ProductService(this.productRepository);
        this.productController = new ProductController(this.productService);
        this.productRouter = new ProductRouter(this.productController);
    }

    getRouter(){
        return this.productRouter.getRouter();
    }

}