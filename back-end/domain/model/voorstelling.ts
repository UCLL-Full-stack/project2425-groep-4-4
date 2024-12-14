import { Film } from "./film";
import { Ticket } from "./ticket";
import { Zaal } from "./zaal";
import { Film as FilmPrisma, Voorstelling as VoorstellingPrisma, Zaal as ZaalPrisma } from '@prisma/client';

export class Voorstelling {
    readonly id?: number
    readonly zaalId: number
    readonly filmId: number
    readonly datum: Date
    readonly tijdstip: string


    constructor(voorstelling: {id?: number; zaalId: number; filmId: number; datum: Date; tijdstip: string;}) {
        this.id = voorstelling.id
        this.zaalId = voorstelling.zaalId
        this.filmId = voorstelling.filmId
        this.datum = voorstelling.datum
        this.tijdstip = voorstelling.tijdstip
        this.validate(voorstelling)
    }

    getId(): number | undefined {
        return this.id
    }

    getZaalId(): number {
        return this.zaalId
    }

    getFilmId(): number {
        return this.filmId
    }

    getDatum(): Date {
        return this.datum
    }

    getTijdstip(): string {
        return this.tijdstip
    }

    validate(voorstelling: {zaalId: number; filmId: number; datum: Date; tijdstip: string}) {
        if (!voorstelling.zaalId) {
            throw new Error("ZaalId is verplicht")
        }
        if (!voorstelling.filmId) {
            throw new Error("FilmId is verplicht")
        }
        if (!voorstelling.datum) {
            throw new Error("Datum is verplicht")
        }
        if (!voorstelling.tijdstip) {
            throw new Error("Tijdstip is verplicht")
        }
    }

    static from({
        id,
        zaalId,
        filmId,
        datum,
        tijdstip,
    }: VoorstellingPrisma ) {
        return new Voorstelling({
            id,
            zaalId,
            filmId,
            datum,
            tijdstip,
        });
    }
}