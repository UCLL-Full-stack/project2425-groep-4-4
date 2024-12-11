-- CreateTable
CREATE TABLE "Acteur" (
    "id" SERIAL NOT NULL,
    "voornaam" TEXT NOT NULL,
    "achternaam" TEXT NOT NULL,
    "nationaliteit" TEXT NOT NULL,
    "geboortedatum" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Acteur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Film" (
    "id" SERIAL NOT NULL,
    "titel" TEXT NOT NULL,
    "speeltijd" INTEGER NOT NULL,
    "beschrijving" TEXT NOT NULL,

    CONSTRAINT "Film_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "voorstellingId" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "admin" BOOLEAN NOT NULL,
    "voornaam" TEXT NOT NULL,
    "achternaam" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voorstelling" (
    "id" SERIAL NOT NULL,
    "datum" TIMESTAMP(3) NOT NULL,
    "tijdstip" TEXT NOT NULL,
    "zaalId" INTEGER NOT NULL,
    "filmId" INTEGER NOT NULL,

    CONSTRAINT "Voorstelling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Zaal" (
    "id" SERIAL NOT NULL,
    "plaatsen" INTEGER NOT NULL,

    CONSTRAINT "Zaal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ActeurToFilm" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ActeurToFilm_AB_unique" ON "_ActeurToFilm"("A", "B");

-- CreateIndex
CREATE INDEX "_ActeurToFilm_B_index" ON "_ActeurToFilm"("B");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_voorstellingId_fkey" FOREIGN KEY ("voorstellingId") REFERENCES "Voorstelling"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voorstelling" ADD CONSTRAINT "Voorstelling_zaalId_fkey" FOREIGN KEY ("zaalId") REFERENCES "Zaal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voorstelling" ADD CONSTRAINT "Voorstelling_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActeurToFilm" ADD CONSTRAINT "_ActeurToFilm_A_fkey" FOREIGN KEY ("A") REFERENCES "Acteur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActeurToFilm" ADD CONSTRAINT "_ActeurToFilm_B_fkey" FOREIGN KEY ("B") REFERENCES "Film"("id") ON DELETE CASCADE ON UPDATE CASCADE;
