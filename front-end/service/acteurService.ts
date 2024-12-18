import { Acteur, Film } from '@/types/types';

const getAllActeurs = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/acteur/getAll', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
  });
  return response;
};

const getActeurById = async (id: number) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/acteur/' + id, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
  });
  return response;
};

const createActeur = async (acteur: Acteur) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/acteur/create', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(acteur)
  });
  return response;
}

  
const filmService = {
  getAllActeurs,
  getActeurById,
  createActeur
};

export default filmService;
  