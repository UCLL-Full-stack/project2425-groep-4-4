import { Film } from "../model/film"
import database from "./database"

const films: Film[] = []

const createFilm = async (film: Film): Promise<Film> => {
    try {
        const filmPrisma = await database.film.create({
            data: {
                titel: film.titel,
                speeltijd: film.speeltijd,
                beschrijving: film.beschrijving,
                acteurs: { connect: film.acteurs.map(acteur => ({ id: acteur.id })) }  
            },
            include: {
                acteurs: true,
            },
        });
        console.log(filmPrisma)
        return Film.from({
            ...filmPrisma,
            acteurs: filmPrisma.acteurs,
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getFilmById = async ({ id }: { id: number }): Promise<Film | null> => {
    try {
        const filmPrisma = await database.film.findUnique({
            where: { id },
            include: { acteurs: true}
        });

        return filmPrisma ? Film.from(filmPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getFilmByName = (titel: string): Film | undefined => {
    return films.find(film => film.titel === titel)
}


const getAllFilms = async(): Promise<Film[]> => {
    try {
        const filmsPrisma = await database.film.findMany({
            include: {
                acteurs: true,
            }
        });
        return filmsPrisma.map((filmPrisma) => Film.from(filmPrisma))
    } catch (error) {
        throw new Error(`Database error. See server log for details.`);
    }
};

export default {
    createFilm,
    getFilmById,
    getFilmByName,
    getAllFilms
}