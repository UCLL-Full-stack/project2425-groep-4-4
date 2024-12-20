import acteurDb from "../domain/data-access/acteur.db";
import { Acteur } from "../domain/model/acteur";
import { ActeurInput } from "../types";

const createActeur = ({voornaam, achternaam, nationaliteit, geboortedatum}: ActeurInput): Acteur => {

    if (!voornaam || !achternaam || !nationaliteit || !geboortedatum) {
        throw new Error("Voornaam, achternaam, nationaliteit en geboortedatum zijn verplicht")
    }

    if (acteurDb.getActeurByFullName(voornaam, achternaam)) {
        throw new Error(`Acteur met voornaam ${voornaam} en achternaam ${achternaam} bestaat al`)
    }

    const acteur = new Acteur({voornaam, achternaam, nationaliteit, geboortedatum})
    return acteurDb.createActeur(acteur)
}

const getAllActeurs = async (): Promise<Acteur[]> => {
    const acteurs = await acteurDb.getAllActeurs();
    console.log("service:");
    console.log(acteurs);
    return acteurs;
}

const getActeurByFullName = (voornaam: string, achternaam: string): Acteur => {
    const acteur = acteurDb.getActeurByFullName(voornaam, achternaam)
    if (!acteur) {
        throw new Error(`Acteur met voornaam ${voornaam} en achternaam ${achternaam} niet gevonden`)
    }
    return acteur
}

const getActeurById = async (id: number): Promise<Acteur> => {
    const acteur = await acteurDb.getActeurById({ id });
    if (!acteur) throw new Error(`Acteur with id ${id} does not exist.`);
    return acteur;
};

const deleteActeurWithId = async ({acteurId}: {acteurId: number}): Promise<Acteur> => {
    const acteur = await acteurDb.deleteActeurWithId({ acteurId });
    if (!acteur) throw new Error(`Acteur with id ${acteurId} does not exist.`);
    return acteur;
}

const updateActeur = async ({ id, voornaam, achternaam, nationaliteit, geboortedatum }: Acteur) => {
    if (!voornaam || !achternaam || !nationaliteit || !geboortedatum) {
        throw new Error("Voornaam, achternaam, nationaliteit en geboortedatum zijn verplicht")
    }

    if (id && getActeurById(id) === null) {
        throw new Error('Voorstelling not found');
    }

    const acteur = new Acteur({id, voornaam, achternaam, nationaliteit, geboortedatum})
    return acteurDb.updateActeur(acteur);
}

export default {
    createActeur,
    getActeurByFullName,
    getAllActeurs,
    getActeurById,
    deleteActeurWithId,
    updateActeur
}