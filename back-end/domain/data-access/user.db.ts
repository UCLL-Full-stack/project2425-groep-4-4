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
        const usersPrisma = await database.user.findMany({ take: 2 });
        console.log(usersPrisma.length)
        return usersPrisma.map((userPrisma) => {console.log(userPrisma); return User.from(userPrisma)})
    } catch (error) {
        throw new Error(`Database error. See server log for details.`);
    }
};

export default {
    createUser,
    getUserByEmail,
    getAllUsers
}