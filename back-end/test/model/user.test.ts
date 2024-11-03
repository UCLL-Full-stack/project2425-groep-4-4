import { Ticket } from "../../domain/model/ticket";
import { Voorstelling } from "../../domain/model/voorstelling";
import { User } from "../../domain/model/user";
import { Zaal } from "../../domain/model/zaal";
import { Film } from "../../domain/model/film";

describe("Ticket", () => {
  const mockZaal = new Zaal({
    id: 1,
    plaatsen: 100,
    voorstellingen: [],
  });

  const mockFilm = new Film({
    id: 1,
    speeltijd: 120,
    beschrijving: "Epische avonturenfilm",
    voorstellingen: [],
    acteurs: [],
  });

  const mockVoorstelling = new Voorstelling({
    id: 1,
    zaal: mockZaal,
    film: mockFilm,
    datum: new Date("2024-11-05"),
    tijdstip: "19:00",
    tickets: [],
  });

  const mockUser = new User({
    id: 1,
    admin: false,
    voornaam: "Alice",
    achternaam: "Johnson",
    email: "alice@example.com",
    password: "securepassword",
    tickets: [],
  });

  test("given: valid values for all fields; when: ticket is created; then: all fields are correctly set", () => {
    const ticket = new Ticket({
      id: 1,
      voorstelling: mockVoorstelling,
      user: mockUser,
    });

    expect(ticket.getId()).toEqual(1);
    expect(ticket.getVoorstelling()).toEqual(mockVoorstelling);
    expect(ticket.getUser()).toEqual(mockUser);
  });

  test("given: a ticket without a user; when: ticket is created; then: user is undefined", () => {
    const ticket = new Ticket({
      voorstelling: mockVoorstelling,
    });

    expect(ticket.getId()).toBeUndefined();
    expect(ticket.getVoorstelling()).toEqual(mockVoorstelling);
    expect(ticket.getUser()).toBeUndefined();
  });

  test("given: a ticket without an id; when: ticket is created; then: id is undefined", () => {
    const ticket = new Ticket({
      voorstelling: mockVoorstelling,
      user: mockUser,
    });

    expect(ticket.getId()).toBeUndefined();
    expect(ticket.getVoorstelling()).toEqual(mockVoorstelling);
    expect(ticket.getUser()).toEqual(mockUser);
  });
});
