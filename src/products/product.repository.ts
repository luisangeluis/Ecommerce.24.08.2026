import Product from "./product.model";

export class ProductRepository implements ProductRepository{
    constructor(private readonly productModel:typeof Product) {}

    async getAllProducts(){
        return await this.productModel.findAll()
    }
}