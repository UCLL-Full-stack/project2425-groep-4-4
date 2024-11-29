import ticketDb from "../domain/data-access/ticket.db";
import voorstellingDb from "../domain/data-access/voorstelling.db";
import { Ticket } from "../domain/model/ticket";
import { TicketInput } from "../types";

const createTicket = ({voorstelling: VoorstellingInput}: TicketInput): Ticket => {

    if (!VoorstellingInput) {
        throw new Error("voorstelling is verplicht")
    }

    if (VoorstellingInput.id === undefined) {
        throw new Error('voorstelling ID is undefined');
    }

    const voorstelling = voorstellingDb.getVoorstellingById(VoorstellingInput.id)
    const ticket = new Ticket({voorstelling, user: undefined})

    return ticketDb.createTicket(ticket)
}

// const getAllTickets = async (): Promise<Ticket[]> => ticketDb.getAllTickets(); 

export default {
    createTicket,
    // getAllTickets
}