import { Acteur } from "./acteur";
import { Voorstelling } from "./voorstelling";

export class Film {
    readonly id?: number
    readonly speeltijd: number
    readonly beschrijving: string
    readonly voorstellingen: Voorstelling[]
    readonly acteurs: Acteur[]
    

    constructor(film: {id?: number; speeltijd: number; beschrijving: string; voorstellingen: Voorstelling[]; acteurs: Acteur[];}) {
        this.id = film.id
        this.speeltijd = film.speeltijd
        this.beschrijving = film.beschrijving
        this.voorstellingen = film.voorstellingen || []
        this.acteurs = film.acteurs || []
    }

    addVoorstellingToFilm(voorstelling: Voorstelling) {
        this.voorstellingen.push(voorstelling)
    }

    addActeurToFilm(acteur: Acteur) {
        this.acteurs.push(acteur)
    }

    getId(): number | undefined {
        return this.id
    }
    
    getSpeeltijd(): number {
        return this.speeltijd
    }

    getBeschrijving(): string {
        return this.beschrijving
    }

    getVoorstellingen(): Voorstelling[] {
        return this.voorstellingen
    }

    getActeurs(): Acteur[] {
        return this.acteurs
    }
}