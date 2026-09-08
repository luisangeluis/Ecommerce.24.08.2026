import { CreateProductDto } from "../middlewares/validateCreateProduct.middleware";
import { ProductAttributes, ProductCreationAttributes } from "../product.model";
import { Product } from "../types/Product";

export interface ProductRepositoryInterface {
    getAllProducts(): Promise<Product[]>
    getProductById(id: string): Promise<Product | null>
    createProduct(data: CreateProductDto, userId: string): Promise<Product>
    updateProductById(id: string, data: Partial<ProductAttributes>): Promise<Product | null>
    deleteProductById(id: string): Promise<boolean>
    getProductsByUserId(userId: string): Promise<Product[]>
}