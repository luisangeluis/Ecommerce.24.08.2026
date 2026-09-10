import { NextFunction, Request, Response } from "express";
import { createProductSchema } from "../product.dto";


export const validateCreateProductMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const result = createProductSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid product data",
            errors: result.error.issues.map(issue => ({
                field: issue.path,
                message: issue.message
            }))
        });
    }

    req.body = result.data;

    next();
}
