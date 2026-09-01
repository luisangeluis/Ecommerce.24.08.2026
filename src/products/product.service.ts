import { ProductServiceInterface } from "./interfaces/product.service.interface";
import { ProductAttributes, ProductCreationAttributes } from "./product.model";
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

    async updateProductById(id:string,data:Partial<ProductAttributes>): Promise<Product | null> {
        return await this.productRepository.updateProductById(id,data);
    }

    async deleteProductById(id:string): Promise<boolean> {
        return await this.productRepository.deleteProductById(id);
    }
}