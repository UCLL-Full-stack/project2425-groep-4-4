import { Film } from "../model/film"

const films: Film[] = []

const createFilm = ({speeltijd, beschrijving}: Film): Film => {
    const film = new Film({speeltijd, beschrijving, acteurs: [], voorstellingen: []})
    films.push(film)
    return film
}

const getFilmById = (id: number): Film => {
    const film = films.find(f => f.id === id)
    if (!film) {
        throw new Error(`film met id ${id} niet gevonden`)
    }
    return film
}


const getAllFilms = (): Film[] => films;

export default {
    createFilm,
    getFilmById,
    getAllFilms
}