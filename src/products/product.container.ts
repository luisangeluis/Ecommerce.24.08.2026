import { ProductController } from "./product.controller";
import Product from "./product.model";
import { ProductRepository } from "./product.repository";
import { ProductRouter } from "./product.router";
import { ProductService } from "./product.service";

export class ProductContainer{
    private readonly productRepository:ProductRepository;
    private readonly productService:ProductService;
    private readonly productController:ProductController;
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