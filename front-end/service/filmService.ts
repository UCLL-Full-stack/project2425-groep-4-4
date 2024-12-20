import { Film, FilmInput } from '@/types';

const getAllFilms = async () => {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/film/getAll', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
  });
  return response;
};

const getFilmById = async (id: number) => {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/film/' + id, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
  });
  return response;
};

const createFilm = async (film: FilmInput) => {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
  const role = loggedInUser ? JSON.parse(loggedInUser).role : null;
  if (role !== 'regisseur') {
    throw new Error('You are not authorized to create a film');
  }
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/film/create', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
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
  