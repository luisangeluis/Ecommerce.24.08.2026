import { getZod } from "../utils/getZod";

const z = getZod();

const idSchema = z.object({
    id: z.uuid()
})

export const validateIdMiddleware = (req: any, res: any, next: any) => {
     try {
        idSchema.parse(req.params);

        next();
    } catch {
        return res.status(400).json({
            message: "Invalid id"
        });
    }
}