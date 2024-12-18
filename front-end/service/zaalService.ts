import { Acteur, ActeurInput, Film, UserInput, ZaalInput } from '@/types/types';
import { UserInfo } from 'os';

const getAllZalen = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/zaal/getAll', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
  });
  return response;
};

const getZaalById = async (id: number) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/zaal/' + id, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
  });
  return response;
};

const createZaal = async (zaal: ZaalInput) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/zaal/create', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(zaal)
  });
  return response;
}

  
const filmService = {
  getAllZalen,
  getZaalById,
  createZaal
};

export default filmService;
  