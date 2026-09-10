import { ZodType } from "./utils/getZod";

export class ResponseMapper {

    static parse<T>(
        schema: ZodType<T>,
        data: unknown
    ): T {

        const result = schema.safeParse(data);

        if (!result.success) {
            throw new Error("Invalid response data");
        }

        return result.data;
    }

    static parseMany<T>(schema: ZodType<T>, data: unknown[]) {
        return data.map(item =>
            schema.safeParse(item)
        )
    }
}