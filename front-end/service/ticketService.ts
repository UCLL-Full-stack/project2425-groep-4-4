import { Acteur, Film, Ticket } from '@/types/types';

const getAllTickets = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/ticket/getAll', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
  });
  return response;
};

const createTicket = async (ticket: Ticket) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/acteur/create', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(ticket)
  });
  return response;
}

  
const filmService = {
  getAllTickets,
  createTicket
};

export default filmService;
  