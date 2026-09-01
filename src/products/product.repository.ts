import { ProductRepositoryInterface } from "./interfaces/product.repository.interface";
import Product, { ProductCreationAttributes } from "./product.model";

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
}