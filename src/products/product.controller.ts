import { Request, Response } from "express";

export class ProductController {
    private readonly products;

    constructor() {
        this.products = [{ id: 1, title: "product1" }, { id: 2, title: "product2" }];
    }

    getAll = (req: Request, res: Response) => {
        console.log("hola")
        return res.send(this.products);
    }
}