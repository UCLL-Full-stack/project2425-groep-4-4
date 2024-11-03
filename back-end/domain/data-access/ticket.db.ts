import { Ticket } from "../model/ticket"

const tickets: Ticket[] = []

const createTicket = ({voorstelling}: Ticket): Ticket => {
    const ticket = new Ticket({voorstelling, user: undefined})
    tickets.push(ticket)
    return ticket
}

const getAllTickets = (): Ticket[] => tickets;

export default {
    createTicket,
    getAllTickets
}