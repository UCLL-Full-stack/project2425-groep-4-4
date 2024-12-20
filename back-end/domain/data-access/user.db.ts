import { User } from "../model/user"
import database from "./database"

const users: User[] = []

const createUser = async ({voornaam, achternaam, email, password}: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                voornaam,
                achternaam,
                email,
                password
            }
        })
        return User.from(userPrisma)
    } catch (error) {
        console.error("Database error:", error);
        throw new Error(`Database error. See server log for details.`);
    }   
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


const getUserByEmail = async ({email}: {email: string}): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { email }
        })
        return userPrisma ? User.from(userPrisma): null;
    } catch (error) {
        console.error("Database error:", error);
        throw new Error(`Database error. See server log for details.`);
    }
}

const deleteUserWithId = async ({userId}: {userId: number}): Promise<User> => {
    try {
        const userPrisma = await database.user.delete({
            where: {
                id: userId,
            }
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('error database, see server log for details');
    }
}

const updateUser = async ({ id, role, voornaam, achternaam, email, password }: User) => {
    try {
        const userPrisma = await database.user.update({
            where: { id },
            data: { 
                role,
                voornaam, 
                achternaam, 
                email, 
                password
            }
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('error database, see server log for details');
    }
}

export default {
    createUser,
    getUserByEmail,
    getAllUsers,
    getUserById,
    deleteUserWithId,
    updateUser
}