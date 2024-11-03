export type ActeurInput = {
    id?: number;
    voornaam?: string;
    achternaam?: string;
    nationaliteit?: string;
    geboortedatum?: Date;
    films?: FilmInput[];
}

export type FilmInput = {
    id?: number
    titel?: string
    speeltijd?: number
    beschrijving?: string
    voorstellingen?: VoorstellingInput[]
    acteurs?: ActeurInput[]
}

export type VoorstellingInput = {
    id?: number
    zaal?: ZaalInput
    film?: FilmInput
    datum?: Date
    tijdstip?: string
    tickets?: TicketInput[]
}

export type ZaalInput = {
    id?: number
    plaatsen?: number
    voorstellingen?: VoorstellingInput[]
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
    tickets?: TicketInput[]
}