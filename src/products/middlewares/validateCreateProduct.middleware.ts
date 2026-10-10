import { NextFunction, Request, Response } from "express";
import { createProductSchema } from "../product.dto";
import { BadRequestError } from "../../common/errors/badRequest.error";


export const validateCreateProductMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const result = createProductSchema.safeParse(req.body);

    if (!result.success) {
        throw new BadRequestError("Invalid product data", result.error.issues);
    }

    req.body = result.data;

    next();
}
