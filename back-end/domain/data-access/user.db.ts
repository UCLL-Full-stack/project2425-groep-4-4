import { User } from "../model/user"

const users: User[] = []

const createUser = ({admin, voornaam, achternaam, email, password}: User): User => {
    const user = new User({admin, voornaam, achternaam, email, password, tickets: []})
    users.push(user)
    return user
}

const getAllUsers = (): User[] => users;

export default {
    createUser,
    getAllUsers
}