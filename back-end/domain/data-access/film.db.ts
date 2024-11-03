import { Film } from "../model/film"

const films: Film[] = []

const createFilm = ({titel, speeltijd, beschrijving}: Film): Film => {
    const film = new Film({titel, speeltijd, beschrijving, acteurs: [], voorstellingen: []})
    films.push(film)
    return film
}

const getFilmById = (id: number): Film => {
    const film = films.find(film => film.id === id)
    if (!film) {
        throw new Error(`film met id ${id} niet gevonden`)
    }
    return film
}

const getFilmByName = (titel: string): Film | undefined => {
    return films.find(film => film.titel === titel)
}


const getAllFilms = (): Film[] => films;

export default {
    createFilm,
    getFilmById,
    getFilmByName,
    getAllFilms
}