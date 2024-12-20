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

const deleteFilmWithId = async ({ filmId }: { filmId: number }): Promise<Film> => {
    try {
        const filmsPrisma = await database.film.delete({
            where: {
                id: filmId,
            },
            include: {
                acteurs: true,
            },
        });
        console.log(filmsPrisma)
        return Film.from(filmsPrisma);
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('error database, see server log for details');
    }
}

const updateFilm = async ({ id, titel, speeltijd, beschrijving, acteurs }: Film) => {
    try {
        const filmPrisma = await database.film.update({
            where: { id },
            data: {
                titel,
                speeltijd,
                beschrijving,
                acteurs: {
                    set: [],
                    connect: acteurs.map(acteur => ({ id: acteur.id })),
                },
            },
            include: {
                acteurs: true,
            },
        });
        return Film.from(filmPrisma);
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('error database, see server log for details');
    }
};




export default {
    createFilm,
    getFilmById,
    getAllFilms,
    deleteFilmWithId,
    updateFilm
}