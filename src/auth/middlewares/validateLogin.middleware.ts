import { NextFunction, Request, Response } from "express";
import { getZod } from "../../common/utils/getZod";
import { BadRequestError } from "../../common/errors/badRequest.error";

const z = getZod();

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6).max(255)
});

const validateLoginMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
       throw new BadRequestError("Invalid login data", result.error.issues);
    }

    next();
}

export default validateLoginMiddleware;