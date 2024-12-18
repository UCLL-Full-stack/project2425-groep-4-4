import { Film } from "./film";
import { Zaal } from "./zaal";
import { Film as FilmPrisma, Voorstelling as VoorstellingPrisma, Zaal as ZaalPrisma, Acteur as ActeurPrisma } from '@prisma/client';

export class Voorstelling {
    readonly id?: number
    readonly zaal: Zaal
    readonly film: Film
    readonly datum: Date
    readonly tijdstip: string


    constructor(voorstelling: {id?: number; zaal: Zaal; film: Film; datum: Date; tijdstip: string;}) {
        this.id = voorstelling.id
        this.zaal = voorstelling.zaal
        this.film = voorstelling.film
        this.datum = voorstelling.datum
        this.tijdstip = voorstelling.tijdstip
        this.validate(voorstelling)
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

    validate(voorstelling: {zaal: Zaal; film: Film; datum: Date; tijdstip: string}) {
        if (!voorstelling.zaal) {
            throw new Error("ZaalId is verplicht")
        }
        if (!voorstelling.film) {
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
        zaal,
        film,
        datum,
        tijdstip,
    }: VoorstellingPrisma & { zaal: ZaalPrisma, film: FilmPrisma }): Voorstelling {
        return new Voorstelling({
            id,
            zaal: Zaal.from(zaal),
            film: Film.from(film as FilmPrisma & { acteurs: ActeurPrisma[]}),
            datum,
            tijdstip,
        });
    }
}