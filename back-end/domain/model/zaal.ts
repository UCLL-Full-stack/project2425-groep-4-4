import { Voorstelling } from "./voorstelling"

export class Zaal {
    readonly id?: number
    readonly plaatsen: number
    readonly voorstellingen: Voorstelling[]

    constructor(zaal: {id?: number; plaatsen: number; voorstellingen: Voorstelling[];}) {
        this.id = zaal.id
        this.plaatsen = zaal.plaatsen
        this.voorstellingen = zaal.voorstellingen
    }

    addVoorstellingToZaal(voorstelling: Voorstelling) {
        this.voorstellingen.push(voorstelling)
    }

    getId(): number | undefined {
        return this.id
    }

    getPlaatsen(): number {
        return this.plaatsen
    }

    getVoorstellingen(): Voorstelling[] {
        return this.voorstellingen
    }
}