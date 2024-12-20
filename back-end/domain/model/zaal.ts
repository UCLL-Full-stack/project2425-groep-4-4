import { Voorstelling } from "./voorstelling"
import { Zaal as ZaalPrisma, Voorstelling as VoorstellingPrisma } from '@prisma/client';

export class Zaal {
    readonly id?: number
    readonly plaatsen: number
    readonly zaalnummer: number

    constructor(zaal: {id?: number; plaatsen: number; zaalnummer: number}) {
        this.id = zaal.id
        this.plaatsen = zaal.plaatsen
        this.zaalnummer = zaal.zaalnummer
        this.validate(zaal)
    }

    getId(): number | undefined {
        return this.id
    }

    getPlaatsen(): number {
        return this.plaatsen
    }

    getZaalnummer(): number {
        return this.zaalnummer
    }

    validate(zaal: {plaatsen: number}) {
        if (!zaal.plaatsen) {
            throw new Error("Aantal plaatsen is verplicht")
        }
    }   

    static from({
        id,
        plaatsen,
        zaalnummer,
    }: ZaalPrisma ) {
        return new Zaal({
            id,
            plaatsen,
            zaalnummer
        });
    }
}