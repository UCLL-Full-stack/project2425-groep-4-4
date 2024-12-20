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

const deleteActeurWithId = async ({ acteurId }: { acteurId: number }): Promise<Acteur> => {
    try {
        const acteurPrisma = await database.acteur.delete({
            where: {
                id: acteurId,
            }
        });
        return Acteur.from(acteurPrisma);
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('error database, see server log for details');
    }
}

const updateActeur = async ({ id, voornaam, achternaam, nationaliteit, geboortedatum }: Acteur) => {
    try {
        const acteurPrisma = await database.acteur.update({
            where: { id },
            data: { 
                voornaam, 
                achternaam, 
                nationaliteit, 
                geboortedatum
            }
        });
        return Acteur.from(acteurPrisma);
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('error database, see server log for details');
    }
}

export default {
    createActeur,
    getActeurByFullName,
    getAllActeurs,
    getActeurById,
    deleteActeurWithId,
    updateActeur
}