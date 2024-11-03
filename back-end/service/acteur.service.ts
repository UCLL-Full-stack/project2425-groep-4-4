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

    const acteur = new Acteur({voornaam, achternaam, nationaliteit, geboortedatum, films: []})
    return acteurDb.createActeur(acteur)
}

const getAllActeurs = (): Acteur[] => acteurDb.getAllActeurs();

const getActeurByFullName = (voornaam: string, achternaam: string): Acteur => {
    const acteur = acteurDb.getActeurByFullName(voornaam, achternaam)
    if (!acteur) {
        throw new Error(`Acteur met voornaam ${voornaam} en achternaam ${achternaam} niet gevonden`)
    }
    return acteur
}

export default {
    createActeur,
    getActeurByFullName,
    getAllActeurs
}