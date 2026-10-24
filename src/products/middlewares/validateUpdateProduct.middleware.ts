import { NextFunction, Request, Response } from "express";
import { updateProductSchema } from "../product.dto";

export const validateUpdateProductMiddleware = (req: Request, res: Response, next: NextFunction) => {
    req.body = updateProductSchema.parse(req.body);
    next();
}