import { Zaal } from "@prisma/client";

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
    acteurs?: ActeurInput[]
}

export type ZaalInput = {
    id?: number
    plaatsen?: number
}

export type VoorstellingInput = {
    id?: number
    zaal?: ZaalInput
    film?: FilmInput
    datum?: Date
    tijdstip?: string
}

export type TicketInput = {
    id?: number
    voorstelling?: VoorstellingInput
    user?: UserInput
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
    token: string
    email: string
    fullname: string
    role: Role
}   

