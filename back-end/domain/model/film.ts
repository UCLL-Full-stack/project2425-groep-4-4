import { Acteur } from "./acteur";
import { Voorstelling } from "./voorstelling";
import { Film as FilmPrisma, Acteur as ActeurPrisma, Voorstelling as VoorstellingPrisma } from '@prisma/client';

export class Film {
    readonly id?: number
    readonly titel: string
    readonly speeltijd: number
    readonly beschrijving: string
    readonly acteurs: Acteur[]
    

    constructor(film: {id?: number; titel: string; speeltijd: number; beschrijving: string; acteurs: Acteur[];}) {
        this.id = film.id
        this.titel = film.titel
        this.speeltijd = film.speeltijd
        this.beschrijving = film.beschrijving
        this.acteurs = film.acteurs || []
        this.validate(film)
    }

    addActeurToFilm(acteur: Acteur) {
        this.acteurs.push(acteur)
    }

    getId(): number | undefined {
        return this.id
    }

    getTitel(): string {
        return this.titel
    }
    
    getSpeeltijd(): number {
        return this.speeltijd
    }

    getBeschrijving(): string {
        return this.beschrijving
    }

    getActeurs(): Acteur[] {
        return this.acteurs
    }

    validate(Film: {titel: string; speeltijd: number; beschrijving: string}) {
        if (!Film.titel) {
            throw new Error("Titel is verplicht")
        }
        if (!Film.speeltijd) {
            throw new Error("Speeltijd is verplicht")
        }
        if (!Film.beschrijving) {
            throw new Error("Beschrijving is verplicht")
        }
        if (Film.speeltijd < 0) {
            throw new Error("Speeltijd moet groter zijn dan 0")
        }
        if (Film.beschrijving.length < 20) {
            throw new Error("Beschrijving moet minstens 20 karakters bevatten")
        }
    }

    static from({
        id,
        titel,
        speeltijd,
        beschrijving,
        acteurs,
    }: FilmPrisma & { acteurs: ActeurPrisma[]; }) {
        return new Film({
            id,
            titel,
            speeltijd,
            beschrijving,
            acteurs: (acteurs || []).map((acteur) => Acteur.from(acteur)),
        });
    }
}