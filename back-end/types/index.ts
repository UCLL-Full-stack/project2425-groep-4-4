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

export type VoorstellingInput = {
    id?: number
    zaalId?: number
    filmId?: number
    datum?: Date
    tijdstip?: string
}

export type ZaalInput = {
    id?: number
    plaatsen?: number
}

export type TicketInput = {
    id?: number
    voorstelling?: VoorstellingInput
    user?: UserInput
}

export type UserInput = {
    id?: number
    admin?: boolean
    voornaam?: string
    achternaam?: string
    email?: string
    password?: string
}