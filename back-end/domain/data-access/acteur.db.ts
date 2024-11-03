import { Acteur } from "../model/acteur"

const acteurs: Acteur[] = []

const createActeur = ({voornaam, achternaam, nationaliteit, geboortedatum}: Acteur): Acteur => {
    const acteur = new Acteur({voornaam, achternaam, nationaliteit, geboortedatum, films: []})
    acteurs.push(acteur)
    return acteur
}

const getAllActeurs = (): Acteur[] => acteurs;

export default {
    createActeur,
    getAllActeurs
}