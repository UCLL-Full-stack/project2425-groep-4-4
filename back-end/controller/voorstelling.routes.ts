/**
 * @swagger
 *  components:
 *   securitySchemes:
 *    bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 *   schemas:
 *     VoorstellingUpdate:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 132
 *           description: "De unieke identificatie van de voorstelling."
 *         zaalId:
 *           type: integer
 *           example: 125
 *           description: "Informatie over de zaal waar de voorstelling plaatsvindt."
 *         filmId:
 *           type: integer
 *           example: 67
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
 *         plaatsen:
 *           type: integer
 *           example: 100
 *           description: "Het aantal beschikbare plaatsen voor de voorstelling."
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
 *         plaatsen:
 *           type: integer
 *           example: 100
 *           description: "Het aantal beschikbare plaatsen voor de voorstelling."
 *     VoorstellingCreateInput:
 *      type: object
 *      properties:
 *       zaal:
 *        $ref: '#/components/schemas/ZaalInput'
 *       film:
 *        $ref: '#/components/schemas/FilmInput'
 *       datum:
 *        type: string
 *        format: date
 *        example: "2024-11-01"
 *       tijdstip:
 *        type: string
 *        example: "19:30"
 * 
 * 
 */
import express, {Request, Response} from 'express';
import { VoorstellingInput, VoorstellingUpdate } from '../types';
import voorstellingService from '../service/voorstelling.service';
import { Voorstelling } from '../domain/model/voorstelling';

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
 *             $ref: '#/components/schemas/VoorstellingCreateInput'
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
voorstellingRouter.get('/getAll', async (req: Request, res: Response) => {
    try {
        const voorstellingen = await voorstellingService.getAllVoorstellingen();
        res.status(200).json(voorstellingen);
    } catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
})

/**
 * @swagger
 * /voorstelling/{id}:
 *   get:
 *     summary: Get a voorstelling by id.
 *     tags: [Voorstellingen]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The voorstelling id.
 *     responses:
 *       200:
 *         description: An voorstelling object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VoorstellingInput'
 */
voorstellingRouter.get('/:id', async (req: Request, res: Response) => { 
    try {
        const voorstelling = await voorstellingService.getVoorstellingById(Number(req.params.id));
        res.status(200).json(voorstelling);
    } catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
});

/**
 * @swagger
 * /voorstelling/update:
 *   put:
 *     summary: Update een bestaande voorstelling
 *     tags: [Voorstellingen]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VoorstellingUpdate'
 *     responses:
 *       200:
 *         description: Voorstelling succesvol geüpdatet
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
 *         description: Fout bij het updaten van de voorstelling
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
voorstellingRouter.put('/update', async (req: Request, res: Response) => {
    try {
        const voorstelling = <VoorstellingUpdate>req.body;
        const result = await voorstellingService.updateVoorstelling(voorstelling);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
        }
    })

export { voorstellingRouter };