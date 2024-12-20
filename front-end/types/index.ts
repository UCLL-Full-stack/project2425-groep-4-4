export type Acteur = {
    id: number;
    voornaam: string;
    achternaam: string;
    nationaliteit: string;
    geboortedatum?: Date;
    films: Film[];
}

export type Film = {
    id: number
    titel: string
    speeltijd: number
    beschrijving: string
    voorstellingen: Voorstelling[]
    acteurs: Acteur[]
}

export type Voorstelling = {
    id: number
    zaal: Zaal
    film: Film
    datum: Date
    tijdstip: string
    tickets: Ticket[]
}

export type Zaal = {
    id: number
    plaatsen: number
    zaalnummer: number
}

export type Ticket = {
    id: number
    voorstelling: Voorstelling
    user: User
}

export type User = {
    id: number
    admin: boolean
    voornaam: string
    achternaam: string
    email: string
    password: string
    tickets: Ticket[]
}

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

export type UserInput = {
    voornaam?: string
    achternaam?: string
    email?: string
    password?: string
}

export type TicketInput = {
    id?: number
    voorstellingId?: number
    userId?: number
}

export type StatusMessage = {
    message: string;
    type: "error" | "success";
};

export type UserLogin = {
    email: string;
    password: string;
}

export type UserStorage = {
    id: number;
    token: string;
    email: string;
    fullname: string;
    role: string;
}

export type VoorstellingUpdate =  {
    id?: number
    zaalId?: number
    filmId?: number
    datum?: Date
    tijdstip?: string
    plaatsen?: number

}