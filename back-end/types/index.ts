import { Acteur } from "@prisma/client";

export type Role = 'admin' | 'regisseur' | 'user'

export type ActeurInput = {
    id?: number;
    voornaam?: string;
    achternaam?: string;
    nationaliteit?: string;
    geboortedatum?: Date;
}

export type FilmInput = {
    id?: number
    titel?: string
    speeltijd?: number
    beschrijving?: string
    acteurs?: Acteur[]
}

export type ZaalInput = {
    id?: number
    zaalnummer?: number
    plaatsen?: number
}

export type VoorstellingInput = {
    id?: number
    zaal?: ZaalInput
    film?: FilmInput
    datum?: Date
    tijdstip?: string
    plaatsen?: number
}

export type TicketInput = {
    id?: number
    voorstellingId?: number
    userId?: number
}

export type UserInput = {
    id?: number
    role?: Role
    voornaam: string
    achternaam: string
    email: string
    password: string
}

export type AuthenticationResponse = {
    id: number
    token: string
    email: string
    fullname: string
    role: Role
}   

export type VoorstellingUpdate =  {
    id?: number
    zaalId?: number
    filmId?: number
    datum?: Date
    tijdstip?: string
    plaatsen?: number

}