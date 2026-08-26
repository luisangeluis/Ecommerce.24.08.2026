import { ProductServiceInterface } from "./interfaces/product.service.interface";
import { ProductRepository } from "./product.repository";
import { Product } from "./types/Product";

export class ProductService implements ProductServiceInterface{

    constructor(private readonly productRepository:ProductRepository) {}

    getAllProducts = async() => {
        return await this.productRepository.getAllProducts();
    }
    
}