import { Response } from "express";
import { ApiResponse } from "../interfaces/apiResponse.interface";
import { ZodType } from "./getZod"
import { ResponseMapper } from "../response.mapper";
import { AppError } from "../errors/appError";

interface SuccessResponseParams<T> {
    res: Response,
    data: unknown,
    schema: ZodType<T>
    message?: string,
    statusCode?: number,
}

export const successResponse = <T>({ res, data, schema, message = "", statusCode = 200 }: SuccessResponseParams<T>) => {
    const result = schema.safeParse(data);

    if (!result.success) {
        throw new AppError(400, "Invalid response data");
    }

    const response: ApiResponse<T> = {
        success: true,
        message,
        data: result.data
    }

    return res.status(statusCode).json(response);
}