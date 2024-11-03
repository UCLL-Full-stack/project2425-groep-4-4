import { Film } from "../../domain/model/film";
import { Acteur } from "../../domain/model/acteur";
import { Voorstelling } from "../../domain/model/voorstelling";
import { Zaal } from "../../domain/model/zaal";
import { Ticket } from "../../domain/model/ticket";

describe("Film", () => {
  const validId = 1;
  const validSpeeltijd = 120;
  const validBeschrijving = "Een spannende film over een epische reis";
  const validVoorstellingen: Voorstelling[] = [];
  const validActeurs: Acteur[] = [];

  const validFilmData = {
    id: validId,
    speeltijd: validSpeeltijd,
    beschrijving: validBeschrijving,
    voorstellingen: validVoorstellingen,
    acteurs: validActeurs,
  };

  test("given: valid values for all fields; when: film is created; then: all fields are correctly set", () => {
    const film = new Film(validFilmData);

    expect(film.getId()).toEqual(validId);
    expect(film.getSpeeltijd()).toEqual(validSpeeltijd);
    expect(film.getBeschrijving()).toEqual(validBeschrijving);
    expect(film.getVoorstellingen()).toEqual(validVoorstellingen);
    expect(film.getActeurs()).toEqual(validActeurs);
  });

  test("given: a new voorstelling; when: addVoorstellingToFilm is called; then: voorstelling is added to the film's voorstellingen array", () => {
    const film = new Film(validFilmData);
    const zaal = new Zaal({ id: 1, plaatsen: 80, voorstellingen: [] });
    const tickets: Ticket[] = [];
    const datum = new Date("2024-11-05");
    const tijdstip = "19:00";

    const newVoorstelling: Voorstelling = new Voorstelling({
      id: 1,
      zaal: zaal,
      film: film,
      datum: datum,
      tijdstip: tijdstip,
      tickets: tickets,
    });
    film.addVoorstellingToFilm(newVoorstelling);
    expect(film.getVoorstellingen()).toContain(newVoorstelling);
  });

  test("given: a new acteur; when: addActeurToFilm is called; then: acteur is added to the film's acteurs array", () => {
    const film = new Film(validFilmData);
    const newActeur: Acteur = new Acteur({
      id: 2,
      voornaam: "Emma",
      achternaam: "de Vries",
      nationaliteit: "Nederlands",
      geboortedatum: new Date("1985-03-15"),
      films: [],
    });

    film.addActeurToFilm(newActeur);
    expect(film.getActeurs()).toContain(newActeur);
  });

  test("given: undefined values for optional fields; when: film is created; then: id is undefined", () => {
    const film = new Film({
      speeltijd: validSpeeltijd,
      beschrijving: validBeschrijving,
      voorstellingen: validVoorstellingen,
      acteurs: validActeurs,
    });

    expect(film.getId()).toBeUndefined();
  });
});
