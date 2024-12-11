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
    const users = await userDb.getAllUsers();
    return users;
}

export default {
    createUser,
    getAllUsers
}