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
 *         id:
 *           type: integer
 *           example: 1
 *           description: "De unieke identificatie van het ticket."
 *         voorstelling:
 *           $ref: '#/components/schemas/VoorstellingInput'
 *           description: "Informatie over de voorstelling waarvoor het ticket is."
 *         user:
 *           $ref: '#/components/schemas/UserInput'
 *           description: "Informatie over de gebruiker die het ticket heeft gekocht."
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
// ticketRouter.post('/create', (req: Request, res: Response) => {
//     try {
//         const ticket = <TicketInput>req.body;
//         const result = ticketService.createTicket(ticket);
//         res.status(200).json(result);
//     }
//     catch (error) {
//         res.status(400).json({status: 'error', message: (error as Error).message});
//     }
// })

/**
 * @swagger
 * /ticket/getAll:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Verkrijg een lijst van alle tickets
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: Lijst van tickets succesvol opgehaald
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TicketInput'
 *       400:
 *         description: Fout bij het ophalen van de tickets
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
ticketRouter.get('/getAll', async (req: Request, res: Response) => {
    try {
        const tickets = await ticketService.getAllTickets();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
})

export { ticketRouter };