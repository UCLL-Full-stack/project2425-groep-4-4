import { User } from "../model/user"
import database from "./database"

const users: User[] = []

const createUser = ({admin, voornaam, achternaam, email, password}: User): User => {
    const user = new User({admin, voornaam, achternaam, email, password})
    users.push(user)
    return user
}

const getUserByEmail = (email: string): User | undefined => {
    return users.find(user => user.email === email)
}

const getAllUsers = async (): Promise<User[]> => {
    try {
        console.log("Running database query...");
        const usersPrisma = await database.user.findMany();
        console.log("Users fetched:", usersPrisma);
        return usersPrisma.map((userPrisma: any) => User.from(userPrisma));
    } catch (error) {
        console.error("Database error:", error);
        throw new Error(`Database error. See server log for details.`);
    }
};

const getUserById = async ({ id }: { id: number }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createUser,
    getUserByEmail,
    getAllUsers,
    getUserById
}