import { Voorstelling, VoorstellingInput } from "@/types/types";

const getAllVoorstellingen = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/voorstelling/getAll', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
  });
  return response;
};
  
const getVoorstellingById = async (id: number) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/voorstelling/' + id, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
  });
  return response;
};

const createVoorstelling = async (voorstelling: VoorstellingInput) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/voorstelling/create', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(voorstelling)
  });
  return response;
}

const voorstellingService = {
  getAllVoorstellingen,
  getVoorstellingById,
  createVoorstelling
};
  
export default voorstellingService;