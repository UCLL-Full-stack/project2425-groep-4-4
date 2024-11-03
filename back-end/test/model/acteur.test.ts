import { Acteur } from "../../domain/model/acteur";
import { Film } from "../../domain/model/film";

const validId = 1;
const validVoornaam = "John";
const validAchternaam = "Doe";
const validNationaliteit = "American";
const validGeboortedatum = new Date("1990-01-01");
const validFilms: Film[] = [];

const validActeur = {
  id: validId,
  voornaam: validVoornaam,
  achternaam: validAchternaam,
  nationaliteit: validNationaliteit,
  geboortedatum: validGeboortedatum,
  films: validFilms,
};

describe("Acteur", () => {
  test("given: valid values for all fields; when: acteur is created; then: all fields are correctly set", () => {
    const acteur = new Acteur(validActeur);

    expect(acteur.getId()).toEqual(validId);
    expect(acteur.getVoornaam()).toEqual(validVoornaam);
    expect(acteur.getAchternaam()).toEqual(validAchternaam);
    expect(acteur.getNationaliteit()).toEqual(validNationaliteit);
    expect(acteur.getGeboortedatum()).toEqual(validGeboortedatum);
    expect(acteur.getFilms()).toEqual(validFilms);
  });

  test("given: valid values for all fields but id is missing; when: acteur is created; then: id is undefined", () => {
    const acteur = new Acteur({
      ...validActeur,
      id: undefined,
    });
    expect(acteur.getId()).toBeUndefined();
  });

  test("given: a new film; when: addFilmToActeur is called; then: film is added to the acteur's films array", () => {
    const acteur = new Acteur(validActeur);
    const newFilm = new Film({
      id: 2,
      speeltijd: 175,
      beschrijving: "An offer you can't refuse",
      voorstellingen: [],
      acteurs: [],
    });

    acteur.addFilmToActeur(newFilm);
    expect(acteur.getFilms()).toContain(newFilm);
  });
});
