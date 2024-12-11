import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create films
  const films = await prisma.film.createMany({
    data: [
      { titel: "Avatar: The Way of Water", speeltijd: 192, beschrijving: "Jake Sully and Neytiri are back on Pandora for a new adventure." },
      { titel: "The Dark Knight", speeltijd: 152, beschrijving: "Batman faces his most dangerous adversary yet, the Joker." },
      { titel: "Inception", speeltijd: 148, beschrijving: "A thief who enters the dreams of others to steal secrets is given a chance to have his criminal record erased." },
      { titel: "Interstellar", speeltijd: 169, beschrijving: "A group of explorers ventures beyond our solar system to ensure humanity's survival." },
      { titel: "Pulp Fiction", speeltijd: 154, beschrijving: "A series of interconnected stories, each involving crime in Los Angeles." },
      { titel: "Forrest Gump", speeltijd: 142, beschrijving: "The life story of a slow-witted but kind-hearted man from Alabama." }
    ]
  });

  // Create actors
  const actors = await prisma.acteur.createMany({
    data: [
      { voornaam: "Sam", achternaam: "Worthington", nationaliteit: "Australian", geboortedatum: new Date("1976-08-02") },
      { voornaam: "Christian", achternaam: "Bale", nationaliteit: "British", geboortedatum: new Date("1974-01-30") },
      { voornaam: "Leonardo", achternaam: "DiCaprio", nationaliteit: "American", geboortedatum: new Date("1974-11-11") },
      { voornaam: "Matthew", achternaam: "McConaughey", nationaliteit: "American", geboortedatum: new Date("1969-11-04") },
      { voornaam: "John", achternaam: "Travolta", nationaliteit: "American", geboortedatum: new Date("1954-02-18") },
      { voornaam: "Tom", achternaam: "Hanks", nationaliteit: "American", geboortedatum: new Date("1956-07-09") },
      { voornaam: "Zoe", achternaam: "Saldaña", nationaliteit: "American", geboortedatum: new Date("1978-06-19") },
      { voornaam: "Heath", achternaam: "Ledger", nationaliteit: "Australian", geboortedatum: new Date("1979-04-04") },
      { voornaam: "Jodie", achternaam: "Foster", nationaliteit: "American", geboortedatum: new Date("1962-11-19") },
      { voornaam: "Brad", achternaam: "Pitt", nationaliteit: "American", geboortedatum: new Date("1963-12-18") }
    ]
  });

  // Create users
  const users = await prisma.user.createMany({
    data: [
      { admin: true, voornaam: "Admin", achternaam: "User", email: "admin@cinema.com", password: "admin123" },
      { admin: false, voornaam: "John", achternaam: "Doe", email: "john.doe@example.com", password: "password123" },
      { admin: false, voornaam: "Jane", achternaam: "Smith", email: "jane.smith@example.com", password: "password123" }
    ]
  });

  // Create zalen (theaters)
  const zalen = await prisma.zaal.createMany({
    data: [
      { plaatsen: 100 },
      { plaatsen: 120 },
      { plaatsen: 150 },
      { plaatsen: 80 },
      { plaatsen: 90 },
      { plaatsen: 110 },
      { plaatsen: 200 },
      { plaatsen: 250 },
      { plaatsen: 75 },
      { plaatsen: 60 },
      { plaatsen: 130 },
      { plaatsen: 140 }
    ]
  });

  // Create voorstellingen (showings)
  const voorstellingen = await prisma.voorstelling.createMany({
    data: [
      { datum: new Date("2024-12-01T15:00:00"), tijdstip: "15:00", zaalId: 1, filmId: 1 },
      { datum: new Date("2024-12-01T18:00:00"), tijdstip: "18:00", zaalId: 2, filmId: 2 },
      { datum: new Date("2024-12-02T12:00:00"), tijdstip: "12:00", zaalId: 3, filmId: 3 },
      { datum: new Date("2024-12-02T20:00:00"), tijdstip: "20:00", zaalId: 4, filmId: 4 },
      { datum: new Date("2024-12-03T10:00:00"), tijdstip: "10:00", zaalId: 5, filmId: 5 },
      { datum: new Date("2024-12-03T13:00:00"), tijdstip: "13:00", zaalId: 6, filmId: 6 },
      { datum: new Date("2024-12-04T14:00:00"), tijdstip: "14:00", zaalId: 7, filmId: 1 },
      { datum: new Date("2024-12-04T17:00:00"), tijdstip: "17:00", zaalId: 8, filmId: 2 },
      { datum: new Date("2024-12-05T11:00:00"), tijdstip: "11:00", zaalId: 9, filmId: 3 },
      { datum: new Date("2024-12-05T16:00:00"), tijdstip: "16:00", zaalId: 10, filmId: 4 },
      { datum: new Date("2024-12-06T19:00:00"), tijdstip: "19:00", zaalId: 11, filmId: 5 },
      { datum: new Date("2024-12-06T21:00:00"), tijdstip: "21:00", zaalId: 12, filmId: 6 },
      { datum: new Date("2024-12-07T10:00:00"), tijdstip: "10:00", zaalId: 1, filmId: 2 },
      { datum: new Date("2024-12-07T13:00:00"), tijdstip: "13:00", zaalId: 2, filmId: 3 },
      { datum: new Date("2024-12-08T17:00:00"), tijdstip: "17:00", zaalId: 3, filmId: 4 },
      { datum: new Date("2024-12-08T20:00:00"), tijdstip: "20:00", zaalId: 4, filmId: 5 },
      { datum: new Date("2024-12-09T15:00:00"), tijdstip: "15:00", zaalId: 5, filmId: 6 },
      { datum: new Date("2024-12-09T18:00:00"), tijdstip: "18:00", zaalId: 6, filmId: 1 }
    ]
  });

  console.log("Seeding complete!");
}

(async () => {
    try {
      await main();
      await prisma.$disconnect();
    } catch (error) {
      console.error(error);
      await prisma.$disconnect();
      process.exit(1);
    }
  })();
