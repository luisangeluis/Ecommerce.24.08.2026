import { NextFunction, Request, Response } from "express";
import { getZod, InferSchema } from "../../common/utils/getZod";

const z = getZod();

export const createProductSchema = z.object({
    title: z.string().min(2).max(255),
    description: z.string().min(2).max(1000),
    price: z.number().min(0).transform(price => price.toFixed(2)),
})

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

// export default validateCreateProductMiddleware;
export type CreateProductDto = InferSchema<typeof createProductSchema>