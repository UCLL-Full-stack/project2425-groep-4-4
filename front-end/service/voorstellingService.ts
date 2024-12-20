import { Voorstelling, VoorstellingInput, VoorstellingUpdate } from "@/types";

const getAllVoorstellingen = async () => {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/voorstelling/getAll', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
  });
  return response;
};
  
const getVoorstellingById = async (id: number) => {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/voorstelling/' + id, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
  });
  return response;
};

const createVoorstelling = async (voorstelling: VoorstellingInput) => {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
  const role = loggedInUser ? JSON.parse(loggedInUser).role : null;

  if (role !== 'admin') {
    throw new Error('You are not authorized to create a voorstelling');
  }

  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/voorstelling/create', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(voorstelling)
  });
  return response;
}

const UpdateVoorstelling = async (voorstelling: VoorstellingUpdate) => {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/voorstelling/update', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(voorstelling)
  })
  return response;
}

const voorstellingService = {
  getAllVoorstellingen,
  getVoorstellingById,
  createVoorstelling,
  UpdateVoorstelling
};
  
export default voorstellingService;