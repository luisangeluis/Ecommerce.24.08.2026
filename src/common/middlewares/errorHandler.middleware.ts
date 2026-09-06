import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";
import { success } from "zod";
import { DatabaseError, ForeignKeyConstraintError, UniqueConstraintError, ValidationError } from "sequelize";

export const errorHandlerMiddleware = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError)
        return res
            .status(err.statusCode)
            .json({
                success: false,
                message: err.message,
                data: null
            });

    if (err instanceof ValidationError)
        return res.status(400).json({
            success: false,
            message: err.message,
            data: null
        });

    if (err instanceof UniqueConstraintError) {
        return res.status(409).json({
            success: false,
            message: "Resource already exists",
            data: null
        });
    }

    if (err instanceof ForeignKeyConstraintError) {
        return res.status(400).json({
            success: false,
            message: "Invalid reference",
            data: null
        });
    }

    if (err instanceof DatabaseError) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Database error",
            data: null
        });
    }

    // Unknown error
    console.error(err);

    return res.status(500).json({
        success: false,
        message: "Internal server error",
        data: null
    });

}