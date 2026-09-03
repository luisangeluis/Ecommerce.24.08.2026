import User, { UserCreationAttributes } from "../user.model";

export interface UserServiceInterface {
    createUser(data:UserCreationAttributes): Promise<User>;
    findUserByEmail(email: string): Promise<User | null>;
    validatePassword(password: string, hashedPassword: string): Promise<boolean>;
}