import { PrismaClient } from '@prisma/client';
import { connect } from 'http2';

const prisma = new PrismaClient();

async function main() {

  // Delete existing data
  await prisma.ticket.deleteMany()
  await prisma.voorstelling.deleteMany();
  await prisma.zaal.deleteMany();
  await prisma.film.deleteMany();
  await prisma.acteur.deleteMany();
  await prisma.user.deleteMany();
  // Create films

  const avatar = await prisma.film.create({
    data: {
      titel: "Avatar: The Way of Water",
      speeltijd: 192,
      beschrijving: "Jake Sully and Neytiri are back on Pandora for a new adventure.",
    },
  });
  
  const darkKnight = await prisma.film.create({
    data: {
      titel: "The Dark Knight",
      speeltijd: 152,
      beschrijving: "Batman faces his most dangerous adversary yet, the Joker.",
    },
  });
  
  const inception = await prisma.film.create({
    data: {
      titel: "Inception",
      speeltijd: 148,
      beschrijving: "A thief who enters the dreams of others to steal secrets is given a chance to have his criminal record erased.",
    },
  });
  
  const interstellar = await prisma.film.create({
    data: {
      titel: "Interstellar",
      speeltijd: 169,
      beschrijving: "A group of explorers ventures beyond our solar system to ensure humanity's survival.",
    },
  });
  
  const pulpFiction = await prisma.film.create({
    data: {
      titel: "Pulp Fiction",
      speeltijd: 154,
      beschrijving: "A series of interconnected stories, each involving crime in Los Angeles.",
    },
  });
  
  const forrestGump = await prisma.film.create({
    data: {
      titel: "Forrest Gump",
      speeltijd: 142,
      beschrijving: "The life story of a slow-witted but kind-hearted man from Alabama.",
    },
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
  const zaal1 = await prisma.zaal.create({
    data: {
      plaatsen: 100,
    },
  });
  
  const zaal2 = await prisma.zaal.create({
    data: {
      plaatsen: 120,
    },
  });
  
  const zaal3 = await prisma.zaal.create({
    data: {
      plaatsen: 150,
    },
  });
  
  const zaal4 = await prisma.zaal.create({
    data: {
      plaatsen: 80,
    },
  });
  
  const zaal5 = await prisma.zaal.create({
    data: {
      plaatsen: 90,
    },
  });
  
  const zaal6 = await prisma.zaal.create({
    data: {
      plaatsen: 110,
    },
  });
  
  const zaal7 = await prisma.zaal.create({
    data: {
      plaatsen: 200,
    },
  });
  
  const zaal8 = await prisma.zaal.create({
    data: {
      plaatsen: 250,
    },
  });
  
  const zaal9 = await prisma.zaal.create({
    data: {
      plaatsen: 75,
    },
  });
  
  const zaal10 = await prisma.zaal.create({
    data: {
      plaatsen: 60,
    },
  });
  
  const zaal11 = await prisma.zaal.create({
    data: {
      plaatsen: 130,
    },
  });
  
  const zaal12 = await prisma.zaal.create({
    data: {
      plaatsen: 140,
    },
  });
  

  // Create voorstellingen (showings)
  const voorstelling1 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-01T18:00:00"),
      tijdstip: "18:00",
      zaal: {connect: {id: zaal1.id}},
      film: {connect: {id: avatar.id}},
    },
  });
  
  const voorstelling2 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-02T12:00:00"),
      tijdstip: "12:00",
      zaal: {connect: {id: zaal3.id}},
      film: {connect: {id: inception.id}},
    },
  });
  
  const voorstelling3 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-02T20:00:00"),
      tijdstip: "20:00",
      zaal: {connect: {id: zaal4.id}},
      film: {connect: {id: interstellar.id}},
    },
  });
  
  const voorstelling4 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-03T10:00:00"),
      tijdstip: "10:00",
      zaal: {connect: {id: zaal5.id}},
      film: {connect: {id: pulpFiction.id}},
    },
  });
  
  const voorstelling5 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-03T13:00:00"),
      tijdstip: "13:00",
      zaal: {connect: {id: zaal6.id}},
      film: {connect: {id: forrestGump.id}},
    },
  });
  
  const voorstelling6 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-04T14:00:00"),
      tijdstip: "14:00",
      zaal: {connect: {id: zaal7.id}},
      film: {connect: {id: avatar.id}},
    },
  });
  
  const voorstelling7 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-04T17:00:00"),
      tijdstip: "17:00",
      zaal: {connect: {id: zaal8.id}},
      film: {connect: {id: darkKnight.id}},
    },
  });
  
  const voorstelling8 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-05T11:00:00"),
      tijdstip: "11:00",
      zaal: {connect: {id: zaal9.id}},
      film: {connect: {id: inception.id}},
    },
  });
  
  const voorstelling9 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-05T16:00:00"),
      tijdstip: "16:00",
      zaal: {connect: {id: zaal10.id}},
      film: {connect: {id: interstellar.id}},
    },
  });
  
  const voorstelling10 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-06T19:00:00"),
      tijdstip: "19:00",
      zaal: {connect: {id: zaal11.id}},
      film: {connect: {id: pulpFiction.id}},
    },
  });
  
  const voorstelling11 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-06T21:00:00"),
      tijdstip: "21:00",
      zaal: {connect: {id: zaal12.id}},
      film: {connect: {id: forrestGump.id}},
    },
  });
  
  const voorstelling12 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-07T10:00:00"),
      tijdstip: "10:00",
      zaal: {connect: {id: zaal1.id}},
      film: {connect: {id: darkKnight.id}},
    },
  });
  
  const voorstelling13 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-07T13:00:00"),
      tijdstip: "13:00",
      zaal: {connect: {id: zaal2.id}},
      film: {connect: {id: inception.id}},
    },
  });
  
  const voorstelling14 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-08T17:00:00"),
      tijdstip: "17:00",
      zaal: {connect: {id: zaal3.id}},
      film: {connect: {id: interstellar.id}},
    },
  });
  
  const voorstelling15 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-08T20:00:00"),
      tijdstip: "20:00",
      zaal: {connect: {id: zaal4.id}},
      film: {connect: {id: pulpFiction.id}},
    },
  });
  
  const voorstelling16 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-09T15:00:00"),
      tijdstip: "15:00",
      zaal: {connect: {id: zaal5.id}},
      film: {connect: {id: forrestGump.id}},
    },
  });
  
  const voorstelling17 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-09T18:00:00"),
      tijdstip: "18:00",
      zaal: {connect: {id: zaal6.id}},
      film: {connect: {id: avatar.id}},
    },
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
