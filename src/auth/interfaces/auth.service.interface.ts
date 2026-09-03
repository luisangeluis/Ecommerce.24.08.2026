import User from "../../users/user.model";

export interface AuthServiceInterface {
    login(email: string, password: string): Promise<string>;
}