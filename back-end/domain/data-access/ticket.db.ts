import { Ticket } from "../model/ticket"
import database from "./database"

const tickets: Ticket[] = []

const createTicket = ({voorstelling}: Ticket): Ticket => {
    const ticket = new Ticket({voorstelling, user: undefined})
    tickets.push(ticket)
    return ticket
}

const getAllTickets = async (): Promise<Ticket[]> => {
    try {
        const ticketsPrisma = await database.ticket.findMany({
            include: {
                voorstelling: true,
                user: true
            }
        });
        return ticketsPrisma.map((ticketPrisma) => Ticket.from(ticketPrisma))
    } catch (error) {
        throw new Error(`Database error. See server log for details.`);
    }
};

export default {
    createTicket,
    getAllTickets
}