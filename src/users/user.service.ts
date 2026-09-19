import { NotFoundError } from "../common/errors/notFound.error";
import { UserRepositoryInterface } from "./interfaces/user.repository.interface";
import { UserServiceInterface } from "./interfaces/user.service.interface";
import { SafeUserResponseDto, safeUserResponseSchema } from "./user.dto";
import User, { UserCreationAttributes } from "./user.model";

export default class UserService implements UserServiceInterface {
    constructor(private readonly userRepository: UserRepositoryInterface) { }

    async createUser(data: UserCreationAttributes): Promise<User> {

        throw new Error("Method not implemented.");
    }

    async findUserByEmail(email: string): Promise<SafeUserResponseDto> {
        const user = await this.userRepository.findUserByEmail(email);

        if (!user) throw new NotFoundError(`User with email: ${email} not found`);

        const plainUser = user.toJSON();
        return safeUserResponseSchema.parse(email);
    }



}
