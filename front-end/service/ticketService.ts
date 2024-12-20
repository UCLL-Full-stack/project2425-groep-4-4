import { Acteur, Film, Ticket, TicketInput } from '@/types';

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

const getTicketsByUser = async (id: number) => {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/ticket/' + id, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
  });
  return response;
}

  
const ticketService = {
  createTicket,
  getTicketsByUser
};

export default ticketService;
  