import { Acteur, Film, Ticket, TicketInput } from '@/types';

const getAllTickets = async () => {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/ticket/getAll', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
  });
  return response;
};

const createTicket = async (ticket: TicketInput) => {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/ticket/create', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(ticket)
  });
  return response;
}

  
const ticketService = {
  getAllTickets,
  createTicket
};

export default ticketService;
  