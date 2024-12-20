import ticketDb from "../domain/data-access/ticket.db";
import userDb from "../domain/data-access/user.db";
import voorstellingDb from "../domain/data-access/voorstelling.db";
import { Ticket } from "../domain/model/ticket";
import { TicketInput } from "../types";

const createTicket = async ({voorstellingId, userId}: TicketInput): Promise<Ticket> => {

    if (!voorstellingId) {
        throw new Error("voorstelling is verplicht")
    }

    if (!userId) {
        throw new Error("user is verplicht")
    }

    const voorstelling = await voorstellingDb.getVoorstellingById({ id: voorstellingId })
    if (!voorstelling) {
        throw new Error("voorstelling niet gevonden")
    }
    const user = await userDb.getUserById({ id: userId })
    if (!user) {
        throw new Error("user niet gevonden")
    }

    const ticket = new Ticket({voorstelling, user})
    return ticketDb.createTicket(ticket)
}

const getTicketsByUser = async ({ id }: { id: number }) => {
    return ticketDb.getTicketsByUser({ id });
}


export default {
    createTicket,
    getTicketsByUser,
}