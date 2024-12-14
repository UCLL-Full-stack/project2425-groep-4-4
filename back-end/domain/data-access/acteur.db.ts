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
        console.log("db:");
        console.log(acteursPrisma);
        return acteursPrisma.map((acteurPrisma: any) => Acteur.from(acteurPrisma))
    } catch (error) {
        throw new Error(`Database error. See server log for details.`);
    }
};

export default {
    createActeur,
    getActeurByFullName,
    getAllActeurs
}