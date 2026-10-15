import { NextFunction, Request, Response } from "express";
import { createProductSchema } from "../product.dto";
import { BadRequestError } from "../../common/errors/badRequest.error";


export const validateCreateProductMiddleware = (req: Request, res: Response, next: NextFunction) => {
    req.body = createProductSchema.parse(req.body);

    next();
}
