import { ResponseValidationError } from "../errors/responseValidationError";
import { getZod, ZodType } from "./getZod";

export function validatedResponse<T>(response: unknown, schema: ZodType<T>): T {
    const plainResponse = Array.isArray(response)
        ? response.map(item =>
            typeof item?.toJSON === "function"
                ? item.toJSON()
                : item
        )
        : typeof (response as any)?.toJSON === "function"
            ? (response as any).toJSON()
            : response

    const result = schema.safeParse(plainResponse);

    if (!result.success) {
        throw new ResponseValidationError(result.error);
    }

    return result.data;
}