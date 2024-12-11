import { Voorstelling } from "./voorstelling"
import { Zaal as ZaalPrisma, Voorstelling as VoorstellingPrisma } from '@prisma/client';

export class Zaal {
    readonly id?: number
    readonly plaatsen: number

    constructor(zaal: {id?: number; plaatsen: number;}) {
        this.id = zaal.id
        this.plaatsen = zaal.plaatsen
        this.validate(zaal)
    }

    getId(): number | undefined {
        return this.id
    }

    getPlaatsen(): number {
        return this.plaatsen
    }

    validate(zaal: {plaatsen: number}) {
        if (!zaal.plaatsen) {
            throw new Error("Aantal plaatsen is verplicht")
        }
    }   

    static from({
        id,
        plaatsen,
    }: ZaalPrisma ) {
        return new Zaal({
            id,
            plaatsen,
        });
    }
}