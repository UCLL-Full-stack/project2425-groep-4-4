import { Acteur } from "../model/acteur"

const acteurs: Acteur[] = []

const createActeur = ({voornaam, achternaam, nationaliteit, geboortedatum}: Acteur): Acteur => {
    const acteur = new Acteur({voornaam, achternaam, nationaliteit, geboortedatum, films: []})
    acteurs.push(acteur)
    return acteur
}

const getActeurByFullName = (voornaam: string, achternaam: string): Acteur | undefined => {
    return acteurs.find(acteur => acteur.voornaam === voornaam && acteur.achternaam === achternaam)
}

const getAllActeurs = (): Acteur[] => acteurs;

export default {
    createActeur,
    getActeurByFullName,
    getAllActeurs
}