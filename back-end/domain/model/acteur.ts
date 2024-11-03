import { Film } from "./film"

export class Acteur {
    readonly id?: number
    readonly voornaam: string
    readonly achternaam: string 
    readonly nationaliteit: string
    readonly geboortedatum: Date
    readonly films: Film[]

    constructor(acteur: {id?: number; voornaam: string; achternaam: string; nationaliteit: string; geboortedatum: Date; films: Film[];}) {
        this.id = acteur.id
        this.voornaam = acteur.voornaam
        this.achternaam = acteur.achternaam
        this.nationaliteit = acteur.nationaliteit
        this.geboortedatum = acteur.geboortedatum
        this.films = acteur.films
    }

    addFilmToActeur(film: Film) {
        this.films.push(film)
    }

    getId(): number | undefined {
        return this.id
    }

    getVoornaam(): string {
        return this.voornaam
    }

    getAchternaam(): string {
        return this.achternaam
    }

    getNationaliteit(): string {
        return this.nationaliteit
    }

    getGeboortedatum(): Date {
        return this.geboortedatum
    }

    getFilms(): Film[] {
        return this.films
    }
}