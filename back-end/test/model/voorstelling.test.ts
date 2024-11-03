import { Voorstelling } from "../../domain/model/voorstelling";
import { Zaal } from "../../domain/model/zaal";
import { Film } from "../../domain/model/film";
import { Ticket } from "../../domain/model/ticket";
import { User } from "../../domain/model/user";

describe("Voorstelling", () => {
  const mockZaal = new Zaal({
    id: 1,
    plaatsen: 150,
    voorstellingen: [],
  });

  const mockFilm = new Film({
    id: 1,
    speeltijd: 120,
    beschrijving: "Een epische fantasyfilm",
    voorstellingen: [],
    acteurs: [],
  });

  const mockTickets: Ticket[] = [
    new Ticket({ id: 1, voorstelling: {} as Voorstelling, user: {} as User }),
    new Ticket({ id: 2, voorstelling: {} as Voorstelling, user: {} as User }),
  ];

  const validDatum = new Date("2024-11-05");
  const validTijdstip = "19:00";

  const validVoorstellingData = {
    id: 1,
    zaal: mockZaal,
    film: mockFilm,
    datum: validDatum,
    tijdstip: validTijdstip,
    tickets: mockTickets,
  };

  test("given: valid values for all fields; when: voorstelling is created; then: all fields are correctly set", () => {
    const voorstelling = new Voorstelling(validVoorstellingData);

    expect(voorstelling.getId()).toEqual(1);
    expect(voorstelling.getZaal()).toEqual(mockZaal);
    expect(voorstelling.getFilm()).toEqual(mockFilm);
    expect(voorstelling.getDatum()).toEqual(validDatum);
    expect(voorstelling.getTijdstip()).toEqual(validTijdstip);
    expect(voorstelling.getTickets()).toEqual(mockTickets);
  });

  test("given: no id provided; when: voorstelling is created; then: id is undefined", () => {
    const voorstelling = new Voorstelling({
      zaal: mockZaal,
      film: mockFilm,
      datum: validDatum,
      tijdstip: validTijdstip,
      tickets: mockTickets,
    });

    expect(voorstelling.getId()).toBeUndefined();
  });

  test("given: empty tickets array; when: voorstelling is created; then: tickets array is empty", () => {
    const voorstelling = new Voorstelling({
      id: 2,
      zaal: mockZaal,
      film: mockFilm,
      datum: validDatum,
      tijdstip: validTijdstip,
      tickets: [],
    });

    expect(voorstelling.getTickets()).toEqual([]);
  });

  test("given: different datum and tijdstip; when: voorstelling is created; then: datum and tijdstip match the input values", () => {
    const customDatum = new Date("2024-12-01");
    const customTijdstip = "15:30";

    const voorstelling = new Voorstelling({
      id: 3,
      zaal: mockZaal,
      film: mockFilm,
      datum: customDatum,
      tijdstip: customTijdstip,
      tickets: mockTickets,
    });

    expect(voorstelling.getDatum()).toEqual(customDatum);
    expect(voorstelling.getTijdstip()).toEqual(customTijdstip);
  });
});
