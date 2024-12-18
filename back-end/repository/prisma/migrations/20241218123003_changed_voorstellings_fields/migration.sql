-- AlterTable
ALTER TABLE "_ActeurToFilm" ADD CONSTRAINT "_ActeurToFilm_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ActeurToFilm_AB_unique";
