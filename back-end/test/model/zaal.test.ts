import { Zaal } from "../../domain/model/zaal";
import { Voorstelling } from "../../domain/model/voorstelling";
import { Film } from "../../domain/model/film";

describe("Zaal", () => {
  const validPlaatsen = 200;
  const validVoorstellingen: Voorstelling[] = [];

  const validZaalData = {
    id: 1,
    plaatsen: validPlaatsen,
    voorstellingen: validVoorstellingen,
  };

  test("given: valid values for all fields; when: zaal is created; then: all fields are correctly set", () => {
    const zaal = new Zaal(validZaalData);
    
    expect(zaal.getId()).toEqual(1);
    expect(zaal.getPlaatsen()).toEqual(validPlaatsen);
    expect(zaal.getVoorstellingen()).toEqual(validVoorstellingen);
  });

  test("given: a new voorstelling; when: addVoorstellingToZaal is called; then: voorstelling is added to the zaal's voorstellingen array", () => {
    const zaal = new Zaal(validZaalData);
    const mockFilm = new Film({
      id: 1,
      speeltijd: 120,
      beschrijving: "Een epische fantasyfilm",
      voorstellingen: [],
      acteurs: [],
    });

    const voorstelling = new Voorstelling({
      id: 1,
      zaal: zaal,
      film: mockFilm,
      datum: new Date("2024-11-05"),
      tijdstip: "19:00",
      tickets: [],
    });

    zaal.addVoorstellingToZaal(voorstelling);
    
    expect(zaal.getVoorstellingen()).toContain(voorstelling);
  });

  test("given: no id provided; when: zaal is created; then: id is undefined", () => {
    const zaal = new Zaal({
      plaatsen: validPlaatsen,
      voorstellingen: validVoorstellingen,
    });

    expect(zaal.getId()).toBeUndefined();
  });

  test("given: a zaal with no voorstellingen; when: getVoorstellingen is called; then: it returns an empty array", () => {
    const zaal = new Zaal(validZaalData);
    
    expect(zaal.getVoorstellingen()).toEqual([]);
  });
});
