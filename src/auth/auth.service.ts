import jwt, { SignOptions } from "jsonwebtoken";
import { jwtExpiresIn, jwtSecret } from "../dev.env";
import { AuthServiceInterface } from "./interfaces/auth.service.interface";
import { UserServiceInterface } from "../users/interfaces/user.service.interface";
import { JWTService } from "./jwt.service";


export default class AuthService implements AuthServiceInterface {
    constructor(private readonly userService: UserServiceInterface,
        private readonly jwtSecret: JWTService
    ) { }

    async login(email: string, password: string): Promise<string> {
        const user = await this.userService.findUserByEmail(email);

        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await this.userService.validatePassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        return this.jwtSecret.generateToken(user.id);
    }

    async register(email: string, password: string): Promise<any> {
        // const existingUser = await this.userService.findUserByEmail(email);

        // if (existingUser) {
        //     throw new Error("User already exists");
        // }

        // const newUser = await this.userService.createUser(email, password);}
        throw new Error("User registration is not implemented yet");
    }
}