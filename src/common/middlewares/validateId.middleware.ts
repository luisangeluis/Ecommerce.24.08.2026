import { NextFunction, Request, RequestHandler, Response } from "express";
import { getZod } from "../utils/getZod";
import { CartItemParams } from "../../cartitems/cartItem.controller";

const z = getZod();

const idSchema = z.object({
    id: z.uuid()
})

const validateIdMiddleware = (req:Request, res:Response, next:NextFunction) => {
     try {
        idSchema.parse(req.params);

        next();
    } catch {
        return res.status(400).json({
            message: "Invalid id"
        });
    }
}

export default validateIdMiddleware;