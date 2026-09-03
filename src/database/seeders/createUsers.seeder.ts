import User from "../../users/user.model";

export const createUsersSeeder = async () => {
    const users = [
        {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            password: "password123",
        }
       
    ];

    // Implementation for creating users would go here

    await User.bulkCreate(users,{ validate: true });
};
