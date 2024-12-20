import { PrismaClient } from '@prisma/client';
import { connect } from 'http2';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {

  // Delete existing data
  await prisma.ticket.deleteMany()
  await prisma.voorstelling.deleteMany();
  await prisma.zaal.deleteMany();
  await prisma.film.deleteMany();
  await prisma.acteur.deleteMany();
  await prisma.user.deleteMany();

   // Create actors
   const acteur1 = await prisma.acteur.create({
    data: {
      voornaam: "Sam",
      achternaam: "Worthington",
      nationaliteit: "Australian",
      geboortedatum: new Date("1976-08-02"),
    },
  });
  
  const acteur2 = await prisma.acteur.create({
    data: {
      voornaam: "Christian",
      achternaam: "Bale",
      nationaliteit: "British",
      geboortedatum: new Date("1974-01-30"),
    },
  });
  
  const acteur3 = await prisma.acteur.create({
    data: {
      voornaam: "Leonardo",
      achternaam: "DiCaprio",
      nationaliteit: "American",
      geboortedatum: new Date("1974-11-11"),
    },
  });
  
  const acteur4 = await prisma.acteur.create({
    data: {
      voornaam: "Matthew",
      achternaam: "McConaughey",
      nationaliteit: "American",
      geboortedatum: new Date("1969-11-04"),
    },
  });
  
  const acteur5 = await prisma.acteur.create({
    data: {
      voornaam: "John",
      achternaam: "Travolta",
      nationaliteit: "American",
      geboortedatum: new Date("1954-02-18"),
    },
  });
  
  const acteur6 = await prisma.acteur.create({
    data: {
      voornaam: "Tom",
      achternaam: "Hanks",
      nationaliteit: "American",
      geboortedatum: new Date("1956-07-09"),
    },
  });
  
  const acteur7 = await prisma.acteur.create({
    data: {
      voornaam: "Zoe",
      achternaam: "Saldaña",
      nationaliteit: "American",
      geboortedatum: new Date("1978-06-19"),
    },
  });
  
  const acteur8 = await prisma.acteur.create({
    data: {
      voornaam: "Heath",
      achternaam: "Ledger",
      nationaliteit: "Australian",
      geboortedatum: new Date("1979-04-04"),
    },
  });
  
  const acteur9 = await prisma.acteur.create({
    data: {
      voornaam: "Jodie",
      achternaam: "Foster",
      nationaliteit: "American",
      geboortedatum: new Date("1962-11-19"),
    },
  });
  
  const acteur10 = await prisma.acteur.create({
    data: {
      voornaam: "Brad",
      achternaam: "Pitt",
      nationaliteit: "American",
      geboortedatum: new Date("1963-12-18"),
    },
  });
  // Create films

  const avatar = await prisma.film.create({
    data: {
      titel: "Avatar: The Way of Water",
      speeltijd: 192,
      beschrijving: "Jake Sully and Neytiri are back on Pandora for a new adventure.",
      acteurs: {connect: [{id: acteur1.id}, {id: acteur7.id}]},
    },
  });
  
  const darkKnight = await prisma.film.create({
    data: {
      titel: "The Dark Knight",
      speeltijd: 152,
      beschrijving: "Batman faces his most dangerous adversary yet, the Joker.",
      acteurs: {connect: [{id: acteur5.id}, {id: acteur3.id}]},
    },
  });
  
  const inception = await prisma.film.create({
    data: {
      titel: "Inception",
      speeltijd: 148,
      beschrijving: "A thief who enters the dreams of others to steal secrets is given a chance to have his criminal record erased.",
      acteurs: {connect: [{id: acteur9.id}, {id: acteur10.id}]},
    },
  });
  
  const interstellar = await prisma.film.create({
    data: {
      titel: "Interstellar",
      speeltijd: 169,
      beschrijving: "A group of explorers ventures beyond our solar system to ensure humanity's survival.",
      acteurs: {connect: [{id: acteur1.id}, {id: acteur7.id}]},
    },
  });
  
  const pulpFiction = await prisma.film.create({
    data: {
      titel: "Pulp Fiction",
      speeltijd: 154,
      beschrijving: "A series of interconnected stories, each involving crime in Los Angeles.",
      acteurs: {connect: [{id: acteur1.id}, {id: acteur7.id}]},
    },
  });
  
  const forrestGump = await prisma.film.create({
    data: {
      titel: "Forrest Gump",
      speeltijd: 142,
      beschrijving: "The life story of a slow-witted but kind-hearted man from Alabama.",
      acteurs: {connect: [{id: acteur1.id}, {id: acteur7.id}]},
    },
  });  

  // Create users
  const users = await prisma.user.createMany({
    data: [
      { role: 'admin', voornaam: "Admin", achternaam: "Admin", email: "admin@cinema.com", password: await bcrypt.hash('admin123', 12)}, 
      { role: 'regisseur', voornaam: "Christopher", achternaam: "Nolan", email: "Christopher.Nolan@example.com", password: await bcrypt.hash('password123', 12)},
      { role: 'user', voornaam: "Jane", achternaam: "Smith", email: "jane.smith@example.com", password: await bcrypt.hash('password123', 12)}
    ]
  });

  // Create zalen (theaters)
  const zaal1 = await prisma.zaal.create({
    data: {
      plaatsen: 100,
      zaalnummer: 1,
    },
  });
  
  const zaal2 = await prisma.zaal.create({
    data: {
      plaatsen: 120,
      zaalnummer: 2,
    },
  });
  
  const zaal3 = await prisma.zaal.create({
    data: {
      plaatsen: 150,
      zaalnummer: 3,
    },
  });
  
  const zaal4 = await prisma.zaal.create({
    data: {
      plaatsen: 80,
      zaalnummer: 4,
    },
  });
  
  const zaal5 = await prisma.zaal.create({
    data: {
      plaatsen: 90,
      zaalnummer: 5,
    },
  });
  
  const zaal6 = await prisma.zaal.create({
    data: {
      plaatsen: 110,
      zaalnummer: 6,
    },
  });
  
  const zaal7 = await prisma.zaal.create({
    data: {
      plaatsen: 200,
      zaalnummer: 7,
    },
  });
  
  const zaal8 = await prisma.zaal.create({
    data: {
      plaatsen: 250,
      zaalnummer: 8,
    },
  });
  
  const zaal9 = await prisma.zaal.create({
    data: {
      plaatsen: 75,
      zaalnummer: 9,
    },
  });
  
  const zaal10 = await prisma.zaal.create({
    data: {
      plaatsen: 60,
      zaalnummer: 10,
    },
  });
  
  const zaal11 = await prisma.zaal.create({
    data: {
      plaatsen: 130,
      zaalnummer: 11,
    },
  });
  
  const zaal12 = await prisma.zaal.create({
    data: {
      plaatsen: 140,
      zaalnummer: 12,
    },
  });
  

  // Create voorstellingen (showings)
  const voorstelling1 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-01T18:00:00"),
      tijdstip: "18:00",
      zaal: {connect: {id: zaal1.id}},
      film: {connect: {id: avatar.id}},
      plaatsen: zaal1.plaatsen,
    },
  });
  
  const voorstelling2 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-02T12:00:00"),
      tijdstip: "12:00",
      zaal: {connect: {id: zaal3.id}},
      film: {connect: {id: inception.id}},
      plaatsen: zaal3.plaatsen,
    },
  });
  
  const voorstelling3 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-02T20:00:00"),
      tijdstip: "20:00",
      zaal: {connect: {id: zaal4.id}},
      film: {connect: {id: interstellar.id}},
      plaatsen: zaal4.plaatsen,
    },
  });
  
  const voorstelling4 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-03T10:00:00"),
      tijdstip: "10:00",
      zaal: {connect: {id: zaal5.id}},
      film: {connect: {id: pulpFiction.id}},
      plaatsen: zaal5.plaatsen,
    },
  });
  
  const voorstelling5 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-03T13:00:00"),
      tijdstip: "13:00",
      zaal: {connect: {id: zaal6.id}},
      film: {connect: {id: forrestGump.id}},
      plaatsen: zaal6.plaatsen,
    },
  });
  
  const voorstelling6 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-04T14:00:00"),
      tijdstip: "14:00",
      zaal: {connect: {id: zaal7.id}},
      film: {connect: {id: avatar.id}},
      plaatsen: zaal7.plaatsen,
    },
  });
  
  const voorstelling7 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-04T17:00:00"),
      tijdstip: "17:00",
      zaal: {connect: {id: zaal8.id}},
      film: {connect: {id: darkKnight.id}},
      plaatsen: zaal8.plaatsen,
    },
  });
  
  const voorstelling8 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-05T11:00:00"),
      tijdstip: "11:00",
      zaal: {connect: {id: zaal9.id}},
      film: {connect: {id: inception.id}},
      plaatsen: zaal9.plaatsen,
    },
  });
  
  const voorstelling9 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-05T16:00:00"),
      tijdstip: "16:00",
      zaal: {connect: {id: zaal10.id}},
      film: {connect: {id: interstellar.id}},
      plaatsen: zaal10.plaatsen,
    },
  });
  
  const voorstelling10 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-06T19:00:00"),
      tijdstip: "19:00",
      zaal: {connect: {id: zaal11.id}},
      film: {connect: {id: pulpFiction.id}},
      plaatsen: zaal11.plaatsen,
    },
  });
  
  const voorstelling11 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-06T21:00:00"),
      tijdstip: "21:00",
      zaal: {connect: {id: zaal12.id}},
      film: {connect: {id: forrestGump.id}},
      plaatsen: zaal12.plaatsen,
    },
  });
  
  const voorstelling12 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-07T10:00:00"),
      tijdstip: "10:00",
      zaal: {connect: {id: zaal1.id}},
      film: {connect: {id: darkKnight.id}},
      plaatsen: zaal1.plaatsen,
    },
  });
  
  const voorstelling13 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-07T13:00:00"),
      tijdstip: "13:00",
      zaal: {connect: {id: zaal2.id}},
      film: {connect: {id: inception.id}},
      plaatsen: zaal2.plaatsen,
    },
  });
  
  const voorstelling14 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-08T17:00:00"),
      tijdstip: "17:00",
      zaal: {connect: {id: zaal3.id}},
      film: {connect: {id: interstellar.id}},
      plaatsen: zaal3.plaatsen,
    },
  });
  
  const voorstelling15 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-08T20:00:00"),
      tijdstip: "20:00",
      zaal: {connect: {id: zaal4.id}},
      film: {connect: {id: pulpFiction.id}},
      plaatsen: zaal4.plaatsen,
    },
  });
  
  const voorstelling16 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-09T15:00:00"),
      tijdstip: "15:00",
      zaal: {connect: {id: zaal5.id}},
      film: {connect: {id: forrestGump.id}},
      plaatsen: zaal5.plaatsen,
    },
  });
  
  const voorstelling17 = await prisma.voorstelling.create({
    data: {
      datum: new Date("2024-12-09T18:00:00"),
      tijdstip: "18:00",
      zaal: {connect: {id: zaal6.id}},
      film: {connect: {id: avatar.id}},
      plaatsen: zaal6.plaatsen,
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
