import { Product } from "../types/Product";

export interface ProductServiceInterface{
    getAllProducts():Promise<Product[]>
    getProductById(id: string):Promise<Product | null>
}