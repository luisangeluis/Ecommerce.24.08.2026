import { ProductCreationAtrributes } from "../product.model";
import { Product } from "../types/Product";

export interface ProductRepositoryInterface{
    getAllProducts():Promise<Product[]>
    getProductById(id: string):Promise<Product | null>
    createProduct(data: ProductCreationAttributes):Promise<Product>
}