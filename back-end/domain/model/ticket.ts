import { User } from "./user";
import { Voorstelling } from "./voorstelling";

export class Ticket {
    readonly id?: number
    readonly voorstelling: Voorstelling
    readonly user?: User

    constructor(ticket: {id?: number; voorstelling: Voorstelling; user?: User;}) {
        this.id = ticket.id
        this.voorstelling = ticket.voorstelling
        this.user = ticket.user
        this.validate(ticket)
    }

    getId(): number | undefined {
        return this.id
    }

    getVoorstelling(): Voorstelling {
        return this.voorstelling
    }

    getUser(): User | undefined {
        return this.user
    }   

    validate(Ticket: {voorstelling: Voorstelling}) {
        if (!Ticket.voorstelling) {
            throw new Error("Voorstelling is verplicht")
        }
    }
}