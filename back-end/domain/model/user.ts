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
}