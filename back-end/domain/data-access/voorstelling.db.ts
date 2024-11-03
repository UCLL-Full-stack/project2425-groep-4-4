import { Voorstelling } from "../model/voorstelling"

const voorstellingen: Voorstelling[] = []

const createVoorstelling = ({zaal, film, datum, tijdstip}: Voorstelling): Voorstelling => {
    const voorstelling = new Voorstelling({zaal, film, datum, tijdstip, tickets: []})
    voorstellingen.push(voorstelling)
    return voorstelling
}

const getVoorstellingById = (id: number): Voorstelling => {
    const voorstelling = voorstellingen.find(v => v.id === id)
    if (!voorstelling) {
        throw new Error(`voorstelling met id ${id} niet gevonden`)
    }
    return voorstelling
}

const getAllVoorstellingen = (): Voorstelling[] => voorstellingen;

export default {
    createVoorstelling,
    getVoorstellingById,
    getAllVoorstellingen
}