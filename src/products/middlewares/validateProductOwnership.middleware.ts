import { NextFunction, Request, Response } from "express";

export const validateProductOwnership = (req: Request, res: Response, next: NextFunction) => {
    const { id: userId } = req.user;
    const { id: productId } = req.params;
    
    
}