import { get } from "http"
import userDb from "../domain/data-access/user.db"
import { User } from "../domain/model/user"
import { UserInput, AuthenticationResponse } from "../types"
import bcrypt from "bcrypt"
import { generateJwtToken } from "../util/jwt"

const createUser = async ({voornaam, achternaam, email, password}: UserInput): Promise<User> => {  
    if (!voornaam || !achternaam || !email || !password) {
        throw new Error("Voornaam, achternaam, email en password zijn verplicht")
    }

    const exisiting = await userDb.getUserByEmail(email);

    if (exisiting) {
        throw new Error(`User with email ${email} already exist.`);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({role: 'user', voornaam, achternaam, email, password: hashedPassword});

    return userDb.createUser(user);
}

const authenticate = async ({email, password}: UserInput): Promise<AuthenticationResponse> => {
    const user = await userDb.getUserByEmail(email);

    if (!user) {
        throw new Error(`User with email ${email} does not exist.`);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error("Invalid password");
    }

    return {
        token: generateJwtToken({email, role: user.role}),
        email: user.email,
        fullname: `${user.voornaam} ${user.achternaam}`,
        role: user.role
    }
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
    getUserById,
    authenticate
}