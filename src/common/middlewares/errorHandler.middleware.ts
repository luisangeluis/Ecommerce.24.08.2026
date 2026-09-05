import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";

export const errorHandlerMiddleware = (err: AppError, req: Request, res: Response, next: NextFunction) => {

    return res.status(err.statusCode).json({message:err.message});
}