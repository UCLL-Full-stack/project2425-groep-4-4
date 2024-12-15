import userDb from "../domain/data-access/user.db"
import { User } from "../domain/model/user"
import { UserInput } from "../types"

const createUser = ({admin, voornaam, achternaam, email, password}: UserInput): User => {

    if (!admin || !voornaam || !achternaam || !email || !password) {
        throw new Error("Voornaam, achternaam, email en password zijn verplicht")
    }

    if (userDb.getUserByEmail(email)) {
        throw new Error(`User met email ${email} bestaat al`)
    }

    const user = new User({admin, voornaam, achternaam, email, password})
    
    return userDb.createUser(user)
}

const getAllUsers = async (): Promise<User[]> => {
    try {
        console.log("Before fetching users");  // Toevoegen voor debugging
        const users = await userDb.getAllUsers();
        console.log("service:");
        console.log(users);
        return users;
    } catch (error) {
        console.error("Error in getAllUsers:", error);
        throw error;
    }
};

const getUserById = async (id: number): Promise<User> => {
    const user = await userDb.getUserById({ id });
    if (!user) throw new Error(`User with id ${id} does not exist.`);
    return user;
};

export default {
    createUser,
    getAllUsers,
    getUserById
}