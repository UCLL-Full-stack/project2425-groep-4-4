import { Film } from '@/types/types';

const getAllFilms = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/film/getAll', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
  });
  return response;
};

const getFilmById = async (id: number) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/film/' + id, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
  });
  return response;
};

const createFilm = async (film: Film) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/film/create', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(film)
  });
  return response;
}

  
const filmService = {
  getAllFilms,
  getFilmById,
  createFilm
};

export default filmService;
  