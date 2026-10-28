import { AppError } from "./appError";

export class ForbiddenError extends AppError {
    constructor(public message = "forbidden resource") {
        super(404, message);

    }
}