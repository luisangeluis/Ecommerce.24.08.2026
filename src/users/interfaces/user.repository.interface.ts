import User from "../user.model";

export interface UserRepositoryInterface {
    findUserByEmail(email: string): Promise<User | null>;
    validatePassword(password: string, hashedPassword: string): Promise<boolean>;

}