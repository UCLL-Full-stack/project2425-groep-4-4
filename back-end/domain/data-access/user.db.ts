import { User } from "../model/user"

const users: User[] = []

const createUser = ({admin, voornaam, achternaam, email, password}: User): User => {
    const user = new User({admin, voornaam, achternaam, email, password, tickets: []})
    users.push(user)
    return user
}

const getUserByEmail = (email: string): User | undefined => {
    return users.find(user => user.email === email)
}

const getAllUsers = (): User[] => users;

export default {
    createUser,
    getUserByEmail,
    getAllUsers
}