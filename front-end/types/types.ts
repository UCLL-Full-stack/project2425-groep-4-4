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
    voorstellingen: Voorstelling[]
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