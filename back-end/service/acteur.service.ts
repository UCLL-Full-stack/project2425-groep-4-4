import acteurDb from "../domain/data-access/acteur.db";
import { Acteur } from "../domain/model/acteur";
import { ActeurInput } from "../types";

const createActeur = ({voornaam, achternaam, nationaliteit, geboortedatum}: ActeurInput): Acteur => {

    if (!voornaam || !achternaam || !nationaliteit || !geboortedatum) {
        throw new Error("Voornaam, achternaam, nationaliteit en geboortedatum zijn verplicht")
    }

    const acteur = new Acteur({voornaam, achternaam, nationaliteit, geboortedatum, films: []})
    return acteurDb.createActeur(acteur)
}

const getAllActeurs = (): Acteur[] => acteurDb.getAllActeurs();

export default {
    createActeur,
    getAllActeurs
}