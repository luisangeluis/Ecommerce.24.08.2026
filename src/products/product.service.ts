import { ProductServiceInterface } from "./interfaces/product.service.interface";
import { ProductCreationAttributes } from "./product.model";
import { ProductRepository } from "./product.repository";
import { Product } from "./types/Product";

export class ProductService implements ProductServiceInterface {
    constructor(private readonly productRepository: ProductRepository) { }

    async getAllProducts (){
        return await this.productRepository.getAllProducts();
    }

    async getProductById(id: string) {
        return await this.productRepository.getProductById(id);
    }

    async createProduct(data:ProductCreationAttributes): Promise<Product> {
        return await this.productRepository.createProduct(data);
    }
}