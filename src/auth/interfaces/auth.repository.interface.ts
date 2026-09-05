import { UserCreationAttributes } from "../../users/user.model";

export interface AuthRepositoryInterface {
    login(email: string, password: string): Promise<string | null>;
}