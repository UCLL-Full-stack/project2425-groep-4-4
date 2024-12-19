import { Acteur, ActeurInput, Film } from '@/types';

const getAllActeurs = async () => {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/acteur/getAll', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
  });
  return response;
};

const getActeurById = async (id: number) => {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/acteur/' + id, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
  });
  return response;
};

const createActeur = async (acteur: ActeurInput) => {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
  const role = loggedInUser ? JSON.parse(loggedInUser).role : null;
  if (role !== 'admin') {
    throw new Error('You are not authorized to create an acteur');
  }
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/acteur/create', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(acteur)
  });
  return response;
}

  
const acteurService = {
  getAllActeurs,
  getActeurById,
  createActeur
};

export default acteurService;
  