import jwt, { SignOptions } from "jsonwebtoken";
import { jwtExpiresIn, jwtSecret } from "../dev.env";
import { AuthServiceInterface } from "./interfaces/auth.service.interface";
import { UserServiceInterface } from "../users/interfaces/user.service.interface";
import { JWTService } from "./jwt.service";
import { UserRepositoryInterface } from "../users/interfaces/user.repository.interface";
import { JWTServiceInterface } from "./interfaces/jwt.service.interface";


export default class AuthService implements AuthServiceInterface {
    constructor(private readonly userRepository: UserRepositoryInterface,
        private readonly jwtSecret: JWTServiceInterface
    ) { }

    async login(email: string, password: string): Promise<string> {
        const user = await this.userRepository.findUserByEmail(email);

        if (!user) {
            console.log("no-user")
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await this.userRepository.validatePassword(password, user.password);
        if (!isPasswordValid) {

            throw new Error("Invalid credentials");
        }

        return this.jwtSecret.generateToken(user.id);
    }


}