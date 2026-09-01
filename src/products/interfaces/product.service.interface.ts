import { ProductAttributes, ProductCreationAttributes } from "../product.model";
import { Product } from "../types/Product";

export interface ProductServiceInterface {
    getAllProducts(): Promise<Product[]>
    getProductById(id: string): Promise<Product | null>
    createProduct(data: ProductCreationAttributes): Promise<Product>
    updateProductById(id: string, data: Partial<ProductAttributes>): Promise<Product | null>
    deleteProductById(id: string): Promise<boolean>
}