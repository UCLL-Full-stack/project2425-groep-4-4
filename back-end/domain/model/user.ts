import { th } from "date-fns/locale"
import { Film } from "./film"
import { Ticket } from "./ticket"
import { Voorstelling } from "./voorstelling"
import { User as UserPrisma, Ticket as TicketPrisma } from '@prisma/client';
import { Role } from "../../types";

export class User {
    readonly id?: number
    readonly role: Role
    readonly voornaam: string
    readonly achternaam: string
    readonly email: string
    readonly password: string

    constructor(user: {id?: number; role: Role; voornaam: string; achternaam: string; email: string; password: string;}) {
        this.id = user.id
        this.role = user.role
        this.voornaam = user.voornaam
        this.achternaam = user.achternaam
        this.email = user.email
        this.password = user.password
        this.validate(user)
    }

    getId(): number | undefined {
        return this.id
    }

    getRole(): Role {
        return this.role
    }

    getVoornaam(): string {
        return this.voornaam
    }

    getAchternaam(): string {
        return this.achternaam
    }

    getEmail(): string {
        return this.email
    }

    getPassword(): string {
        return this.password
    }

    validate(User: {role: Role; voornaam: string; achternaam: string; email: string; password: string}) {
        if (!User.voornaam) {
            throw new Error("Voornaam is verplicht")
        }
        if (!User.role) {
            throw new Error('rol is verplicht');
        }
        if (!User.achternaam) {
            throw new Error("Achternaam is verplicht")
        }
        if (!User.email) {
            throw new Error("Email is verplicht")
        }
        if (!User.password) {
            throw new Error("Password is verplicht")
        }
        if (User.password.length < 6) {
            throw new Error("Password moet minstens 6 karakters bevatten")
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(User.email)) {
            throw new Error("Email is niet geldig");
        }
    }

    static from({
        id,
        role,
        voornaam,
        achternaam,
        email,
        password,
    }: UserPrisma) {
        return new User({
            id,
            role: role as Role,
            voornaam,
            achternaam,
            email,
            password,
        });
    }
}