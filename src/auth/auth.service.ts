import jwt, { SignOptions } from "jsonwebtoken";
import { jwtExpiresIn, jwtSecret } from "../dev.env";


export default class AuthService {
    generateToken(userId: string) {
        return jwt.sign(
            { userId },
            jwtSecret,
            { expiresIn: jwtExpiresIn as SignOptions["expiresIn"] }
        )
    }
}