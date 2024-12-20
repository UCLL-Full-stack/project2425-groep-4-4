/**
 * @swagger
 *  components:
 *   securitySchemes:
 *    bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 *   schemas:
 *     TicketInput:
 *       type: object
 *       properties:
 *         voorstellingId:
 *           type: number
 *           example: 123
 *         userId:
 *           type: number
 *           example: 40
 *     Ticket:
 *       type: object
 *       properties:
 *         voorstelling:
 *           $ref: '#/components/schemas/VoorstellingInput'
 *         user:
 *           $ref: '#/components/schemas/UserInput'
 */

import express, {Request, Response} from 'express';
import { TicketInput } from '../types';
import ticketService from '../service/ticket.service';

const ticketRouter = express.Router();

/**
 * @swagger
 * /ticket/create:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: Maak een nieuw ticket aan
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TicketInput'
 *     responses:
 *       200:
 *         description: Ticket succesvol aangemaakt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/TicketInput'
 *       400:
 *         description: Fout bij het aanmaken van het ticket
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Foutmelding hier."
 */
ticketRouter.post('/create', (req: Request, res: Response) => {
    try {
        const ticket = <TicketInput>req.body;
        console.log(ticket);
        const result = ticketService.createTicket(ticket);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
})

/**
 * @swagger
 * /ticket/{id}:
 *   get:
 *     summary: Get the users Tickets by userid.
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id.
 *     responses:
 *       200:
 *         description: An array of tickets.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VoorstellingInput'
 */
ticketRouter.get('/:id', async (req: Request, res: Response) => { 
    try {
        const tickets = await ticketService.getTicketsByUser({ id: Number(req.params.id) });
        res.status(200).json(tickets);
    } catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
});



export { ticketRouter };