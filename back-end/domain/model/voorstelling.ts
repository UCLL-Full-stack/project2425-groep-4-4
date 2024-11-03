import { Film } from "./film";
import { Ticket } from "./ticket";
import { Zaal } from "./zaal";

export class Voorstelling {
    readonly id?: number
    readonly zaal: Zaal
    readonly film: Film
    readonly datum: Date
    readonly tijdstip: string
    readonly tickets: Ticket[]


    constructor(voorstelling: {id?: number; zaal: Zaal; film: Film; datum: Date; tijdstip: string; tickets: Ticket[];}) {
        this.id = voorstelling.id
        this.zaal = voorstelling.zaal
        this.film = voorstelling.film
        this.datum = voorstelling.datum
        this.tijdstip = voorstelling.tijdstip
        this.tickets = voorstelling.tickets
    }

    getId(): number | undefined {
        return this.id
    }

    getZaal(): Zaal {
        return this.zaal
    }

    getFilm(): Film {
        return this.film
    }

    getDatum(): Date {
        return this.datum
    }

    getTijdstip(): string {
        return this.tijdstip
    }

    getTickets(): Ticket[] {
        return this.tickets
    }
}