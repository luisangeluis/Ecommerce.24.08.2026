import { NextFunction, Request, Response } from "express";
import { getZod } from "../../common/utils/getZod";

const z = getZod();
const createProductSchema = z.object({
    title: z.string().min(2).max(255),
    description: z.string().min(2).max(1000),
    price: z.number().min(0).transform(price => price.toFixed(2))
})

const validateCreateProductMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const result = createProductSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid product data",
            errors: result.error.issues.map(issue=>(
                {
                    field:issue.path.join("."),
                    message: issue.message
                }
            ))
        });
    }

    next();

}

export default validateCreateProductMiddleware;