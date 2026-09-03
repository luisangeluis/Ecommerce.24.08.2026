import { NextFunction, Request, Response } from "express";
import { getZod } from "../../common/utils/getZod";

const z = getZod();

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6).max(255)
});

const validateLoginMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid login data",
            errors: result.error.issues.map(issue => ({
                field: issue.path.join("."),
                message: issue.message
            }))
        });
    }

    next();
}

export default validateLoginMiddleware;