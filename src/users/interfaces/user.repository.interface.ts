import User from "../user.model";

export interface UserRepositoryInterface {
    findUserByEmail(email: string, raw?: boolean): Promise<User | null>;
    validatePassword(password: string, hashedPassword: string): Promise<boolean>;

}