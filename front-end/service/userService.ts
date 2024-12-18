import { Acteur, ActeurInput, Film, UserInput } from '@/types/types';
import { UserInfo } from 'os';

const getAllUsers = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/getAll', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
  });
  return response;
};

const getUserById = async (id: number) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/' + id, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
  });
  return response;
};

const createUser = async (user: UserInput) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/create', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  });
  return response;
}

  
const filmService = {
  getAllUsers,
  getUserById,
  createUser
};

export default filmService;
  