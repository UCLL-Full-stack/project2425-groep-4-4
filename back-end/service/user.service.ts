import userDb from "../domain/data-access/user.db"
import { User } from "../domain/model/user"
import { UserInput } from "../types"

const createUser = ({admin, voornaam, achternaam, email, password}: UserInput): User => {

    if (!admin || !voornaam || !achternaam || !email || !password) {
        throw new Error("Voornaam, achternaam, email en password zijn verplicht")
    }

    const user = new User({admin, voornaam, achternaam, email, password, tickets: []})
    
    return userDb.createUser(user)
}

const getAllUsers = (): User[] => userDb.getAllUsers();

export default {
    createUser,
    getAllUsers
}