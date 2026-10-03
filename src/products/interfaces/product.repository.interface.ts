import { Transaction } from "sequelize";
import { CreateProductDto } from "../product.dto";
import Product, { ProductAttributes } from "../product.model";

export interface ProductRepositoryInterface {
    getAllProducts(): Promise<Product[]>
    getProductById(id: string, t?: Transaction): Promise<Product | null>
    createProduct(data: CreateProductDto, userId: string): Promise<Product>
    updateProductById(id: string, data: Partial<ProductAttributes>): Promise<Product | null>
    deleteProductById(id: string): Promise<number>
    getProductsByUserId(userId: string): Promise<Product[]>
}