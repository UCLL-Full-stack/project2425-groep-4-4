import { Acteur, ActeurInput, Film, UserInput, ZaalInput } from '@/types';
import { UserInfo } from 'os';

const getAllZalen = async () => {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
  const role = loggedInUser ? JSON.parse(loggedInUser).role : null;

  if (role !== 'admin') {
    throw new Error('You are not authorized to view all zalen');
  }

  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/zaal/getAll', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
    }
  });
  return response;
};

const getZaalById = async (id: number) => {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/zaal/' + id, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
  });
  return response;
};

const createZaal = async (zaal: ZaalInput) => {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
  const role = loggedInUser ? JSON.parse(loggedInUser).role : null;
  if (role !== 'admin') {
    throw new Error('You are not authorized to create a zaal');
  }
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/zaal/create', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(zaal)
  });
  return response;
}

  
const zaalService = {
  getAllZalen,
  getZaalById,
  createZaal
};

export default zaalService;
  