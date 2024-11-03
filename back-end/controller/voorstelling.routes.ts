/**
 * @swagger
 * components:
 *   schemas:
 *     VoorstellingInput:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *           description: "De unieke identificatie van de voorstelling."
 *         zaal:
 *           $ref: '#/components/schemas/ZaalInput'
 *           description: "Informatie over de zaal waar de voorstelling plaatsvindt."
 *         film:
 *           $ref: '#/components/schemas/FilmInput'
 *           description: "Informatie over de film die wordt vertoond."
 *         datum:
 *           type: string
 *           format: date
 *           example: "2024-11-01"
 *           description: "De datum van de voorstelling."
 *         tijdstip:
 *           type: string
 *           example: "19:30"
 *           description: "Het tijdstip van de voorstelling."
 *         tickets:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TicketInput'
 *           description: "Een lijst van tickets die voor deze voorstelling zijn verkocht."
 */
import express, {Request, Response} from 'express';
import { VoorstellingInput } from '../types';
import voorstellingService from '../service/voorstelling.service';

const voorstellingRouter = express.Router();

/**
 * @swagger
 * /voorstelling/create:
 *   post:
 *     summary: Maak een nieuwe voorstelling aan
 *     tags: [Voorstellingen]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VoorstellingInput'
 *     responses:
 *       200:
 *         description: Voorstelling succesvol aangemaakt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/VoorstellingInput'
 *       400:
 *         description: Fout bij het aanmaken van de voorstelling
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
voorstellingRouter.post('/create', (req: Request, res: Response) => {
    try {
        const voorstelling = <VoorstellingInput>req.body;
        const result = voorstellingService.createVoorstelling(voorstelling);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
})

/**
 * @swagger
 * /voorstelling/getAll:
 *   get:
 *     summary: Verkrijg een lijst van alle voorstellingen
 *     tags: [Voorstellingen]
 *     responses:
 *       200:
 *         description: Lijst van voorstellingen succesvol opgehaald
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/VoorstellingInput'
 *       400:
 *         description: Fout bij het ophalen van de voorstellingen
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
voorstellingRouter.get('/getAll', (req: Request, res: Response) => {
    try {
        const voorstellingen = voorstellingService.getAllVoorstellingen();
        res.status(200).json(voorstellingen);
    } catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
})

export { voorstellingRouter };