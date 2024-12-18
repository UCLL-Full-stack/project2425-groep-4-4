import { Acteur } from "../model/acteur"
import database from "./database"

const acteurs: Acteur[] = []

const createActeur = ({voornaam, achternaam, nationaliteit, geboortedatum}: Acteur): Acteur => {
    const acteur = new Acteur({voornaam, achternaam, nationaliteit, geboortedatum})
    acteurs.push(acteur)
    return acteur
}

const getActeurByFullName = (voornaam: string, achternaam: string): Acteur | undefined => {
    return acteurs.find(acteur => acteur.voornaam === voornaam && acteur.achternaam === achternaam)
}

const getAllActeurs = async(): Promise<Acteur[]> => {
    try {
        const acteursPrisma = await database.acteur.findMany({
        });
        return acteursPrisma.map((acteurPrisma: any) => Acteur.from(acteurPrisma))
    } catch (error) {
        throw new Error(`Database error. See server log for details.`);
    }
};

const getActeurById = async ({ id }: { id: number }): Promise<Acteur | null> => {
    try {
        const acteurPrisma = await database.acteur.findUnique({
            where: { id },
        });

        return acteurPrisma ? Acteur.from(acteurPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createActeur,
    getActeurByFullName,
    getAllActeurs,
    getActeurById
}