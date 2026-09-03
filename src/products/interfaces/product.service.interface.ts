import Product, { ProductAttributes, ProductCreationAttributes } from "../product.model";

export interface ProductServiceInterface {
    getAllProducts(): Promise<Product[]>
    getProductById(id: string): Promise<Product | null>
    createProduct(data: ProductCreationAttributes): Promise<Product>
    updateProductById(id: string, data: Partial<ProductAttributes>): Promise<Product | null>
    deleteProductById(id: string): Promise<boolean>
    getProductsByUserId(userId: string): Promise<Product[]>
}