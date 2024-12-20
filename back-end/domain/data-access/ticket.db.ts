import { Voorstelling } from "@prisma/client";
import { Ticket } from "../model/ticket"
import { User } from "../model/user";
import database from "./database"

const tickets: Ticket[] = []

const createTicket = async (ticket: Ticket): Promise<Ticket> => {
    try {
        const ticketPrisma = await database.ticket.create({
            data: {
                user: { connect: { id: ticket.getUser().id } },
                voorstelling: { connect: { id: ticket.getVoorstelling().id }}
            },
            include: {
                user: true,
                voorstelling:{
                    include: {
                        zaal: true,
                        film: true
                    }
                },
            },
        });
        if (!ticketPrisma.user) {
            throw new Error('User not found');
        }
        if (!ticketPrisma.voorstelling) {
            throw new Error('Voorstelling not found');
        }
        return Ticket.from({
            ...ticketPrisma,
            user: ticketPrisma.user,
            voorstelling: ticketPrisma.voorstelling,
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getTicketsByUser = async ({ id }: { id: number }): Promise<Ticket[]> => {
    try {
        const ticketsPrisma = await database.ticket.findMany({
            where: { userId: id },
            include: {
                user: true,
                voorstelling: {
                    include: {
                        zaal: true,
                        film: true
                    }
                }
            }
        });
        return ticketsPrisma.map((ticketPrisma: any) => Ticket.from(ticketPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    createTicket,
    getTicketsByUser
}