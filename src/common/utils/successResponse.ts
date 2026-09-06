import { Response } from "express";
import { ApiResponse } from "../interfaces/apiResponse.interface";

interface SuccessResponseParams<T> {
    res: Response,
    data: T,
    message?: string,
    statusCode?: number

}

export const successResponse = <T>({ res, data, message = "", statusCode = 200 }: SuccessResponseParams<T>) => {
    const response: ApiResponse<T> = {
        success: true,
        message,
        data
    }

    return res.status(statusCode).json(response);
}