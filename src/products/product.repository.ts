import { ProductRepositoryInterface } from "./interfaces/product.repository.interface";
import Product, { ProductAttributes, ProductCreationAttributes } from "./product.model";

export class ProductRepository implements ProductRepositoryInterface{
    constructor(private readonly productModel:typeof Product) {}

    async getAllProducts(){
        return await this.productModel.findAll()
    }

    async getProductById(id:string){
        return await this.productModel.findByPk(id)
    }

    async createProduct(data:ProductCreationAttributes){
        return await this.productModel.create(data)
    }

    async updateProductById(id:string,data:Partial<ProductAttributes>){
        const product = await this.getProductById(id);

        if(!product) return null;
        
        return await product.update(data);
    }

    async deleteProductById(id:string){
        const product = await this.getProductById(id);

        if(!product) return false;

        await product.destroy();
        return true;
    }

    async getProductsByUserId(userId: string): Promise<Product[]> {
        return await this.productModel.findAll({ where: { userId } });
    }
}