import { th } from "date-fns/locale"
import { Film } from "./film"
import { Ticket } from "./ticket"
import { Voorstelling } from "./voorstelling"

export class User {
    readonly id?: number
    readonly admin: boolean
    readonly voornaam: string
    readonly achternaam: string
    readonly email: string
    readonly password: string
    readonly tickets: Ticket[]

    constructor(user: {id?: number; admin: boolean; voornaam: string; achternaam: string; email: string; password: string; tickets: Ticket[];}) {
        this.id = user.id
        this.admin = user.admin
        this.voornaam = user.voornaam
        this.achternaam = user.achternaam
        this.email = user.email
        this.password = user.password
        this.tickets = user.tickets
        this.validate(user)
    }

    addTicketToUser(ticket: Ticket) {
        this.tickets.push(ticket)
    }

    getId(): number | undefined {
        return this.id
    }

    getAdmin(): boolean {
        return this.admin
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

    getTickets(): Ticket[] {
        return this.tickets
    }

    validate(User: {admin: boolean; voornaam: string; achternaam: string; email: string; password: string}) {
        if (!User.voornaam) {
            throw new Error("Voornaam is verplicht")
        }
        if (!User.admin) {
            throw new Error("adminveld is verplicht")
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
}