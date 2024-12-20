import { VoorstellingInput, VoorstellingUpdate } from "../../types"
import { Voorstelling } from "../model/voorstelling"
import database from "./database"

const voorstellingen: Voorstelling[] = []

const createVoorstelling = ({zaal, film, datum, tijdstip}: Voorstelling): Voorstelling => {
    const voorstelling = new Voorstelling({zaal, film, datum, tijdstip, plaatsen: zaal.plaatsen})
    voorstellingen.push(voorstelling)
    return voorstelling
}

const getAllVoorstellingen = async (): Promise<Voorstelling[]> => {
    try {
        console.log("Running database query...");
        const voorstellingPrisma = await database.voorstelling.findMany({
            include: {
                zaal: true,
                film: true
            }
        });
        return voorstellingPrisma.map((voorstellingPrisma: any) => Voorstelling.from(voorstellingPrisma))
    } catch (error) {
        console.error("Database error:", error);
        throw new Error(`Database error. See server log for details.`);
    }
};

const getVoorstellingById = async ({ id }: { id: number }): Promise<Voorstelling | null> => {
    try {
        const voorstellingPrisma = await database.voorstelling.findUnique({
            where: { id },
            include: {
                zaal: true,
                film: true
            }
        });

        return voorstellingPrisma ? Voorstelling.from(voorstellingPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateVoorstelling = async ({ id, zaal, film, datum, tijdstip, plaatsen }: Voorstelling) => {
    try {
        const voorstellingPrisma = await database.voorstelling.update({
            where: { id },
            data: { 
                zaal: { connect: { id: zaal.id } }, 
                film: { connect: { id: film.id } }, 
                datum: new Date(datum), 
                tijdstip, 
                plaatsen 
            },
            include : {
                zaal: true,
                film: true
            }
        });
        return Voorstelling.from(voorstellingPrisma);

    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    createVoorstelling,
    getVoorstellingById,
    getAllVoorstellingen,
    updateVoorstelling
}