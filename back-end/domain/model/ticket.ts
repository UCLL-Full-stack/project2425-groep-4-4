import { User } from "./user";
import { Voorstelling } from "./voorstelling";
import { Film as FilmPrisma, Ticket as TicketPrisma, User as UserPrisma, Voorstelling as VoorstellingPrisma, Zaal as ZaalPrisma } from '@prisma/client';

export class Ticket {
    readonly id?: number
    readonly voorstelling: Voorstelling
    readonly user?: User

    constructor(ticket: {id?: number; voorstelling: Voorstelling; user?: User | null;}) {
        this.id = ticket.id
        this.voorstelling = ticket.voorstelling
        this.user = ticket.user ?? undefined
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

    static from({
        id,
        voorstelling,
        user,
    }: TicketPrisma & { voorstelling: VoorstellingPrisma; user: UserPrisma | null}) {
        return new Ticket({
            id,
            voorstelling: Voorstelling.from(voorstelling as VoorstellingPrisma & { zaal: ZaalPrisma, film: FilmPrisma }),  
            user: user ? User.from(user) : undefined
        });
    }
}