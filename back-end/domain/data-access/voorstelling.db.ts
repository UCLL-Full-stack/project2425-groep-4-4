import { Voorstelling } from "../model/voorstelling"
import database from "./database"

const voorstellingen: Voorstelling[] = []

const createVoorstelling = ({zaalId, filmId, datum, tijdstip}: Voorstelling): Voorstelling => {
    const voorstelling = new Voorstelling({zaalId, filmId, datum, tijdstip})
    voorstellingen.push(voorstelling)
    return voorstelling
}

// const getVoorstellingByInfo = ({zaalId, filmId, datum, tijdstip}: Voorstelling): Voorstelling | undefined => {
//     return voorstellingen.find(v => v.zaal === zaal && v.film === film && v.datum === datum && v.tijdstip === tijdstip)
// }

const getVoorstellingById = (id: number): Voorstelling => {
    const voorstelling = voorstellingen.find(v => v.id === id)
    if (!voorstelling) {
        throw new Error(`voorstelling met id ${id} niet gevonden`)
    }
    return voorstelling
}

const getAllVoorstellingen = async (): Promise<Voorstelling[]> => {
    try {
        console.log("Running database query...");
        const voorstellingenPrisma = await database.voorstelling.findMany();
        console.log("voorstellingen fetched:", voorstellingenPrisma);
        return voorstellingenPrisma.map((voorstellingPrisma: any) => Voorstelling.from(voorstellingPrisma))
    } catch (error) {
        console.error("Database error:", error);
        throw new Error(`Database error. See server log for details.`);
    }
};

export default {
    createVoorstelling,
    // getVoorstellingByInfo,
    getVoorstellingById,
    getAllVoorstellingen
}