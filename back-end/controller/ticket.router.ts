import express, {Request, Response} from 'express';
import { TicketInput } from '../types';
import ticketService from '../service/ticket.service';

const ticketRouter = express.Router();

ticketRouter.post('/create', (req: Request, res: Response) => {
    try {
        const ticket = <TicketInput>req.body;
        const result = ticketService.createTicket(ticket);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
})

ticketRouter.get('/getAll', (req: Request, res: Response) => {
    try {
        const tickets = ticketService.getAllTickets();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
})

export { ticketRouter };