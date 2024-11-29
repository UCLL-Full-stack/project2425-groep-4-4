import { Film } from "./film"
import { Film as FilmPrisma, Acteur as ActeurPrisma } from '@prisma/client';

export class Acteur {
    readonly id?: number
    readonly voornaam: string
    readonly achternaam: string 
    readonly nationaliteit: string
    readonly geboortedatum: Date

    constructor(acteur: {id?: number; voornaam: string; achternaam: string; nationaliteit: string; geboortedatum: Date; }) {
        this.id = acteur.id
        this.voornaam = acteur.voornaam
        this.achternaam = acteur.achternaam
        this.nationaliteit = acteur.nationaliteit
        this.geboortedatum = acteur.geboortedatum
        this.validate(acteur)
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

    validate(Acteur: {voornaam: string; achternaam: string; nationaliteit: string; geboortedatum: Date}) {
        if (!Acteur.voornaam) {
            throw new Error("Voornaam is verplicht")
        }
        if (!Acteur.achternaam) {
            throw new Error("Achternaam is verplicht")
        }
        if (!Acteur.nationaliteit) {
            throw new Error("Nationaliteit is verplicht")
        }
        if (!Acteur.geboortedatum) {
            throw new Error("Geboortedatum is verplicht")
        }
    }

    static from({
        id,
        voornaam,
        achternaam,
        nationaliteit,
        geboortedatum,
    }: ActeurPrisma) {
        return new Acteur({
            id,
            voornaam,
            achternaam,
            nationaliteit,
            geboortedatum,
        });
    }
}