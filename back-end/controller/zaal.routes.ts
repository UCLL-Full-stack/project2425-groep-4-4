/**
 * @swagger
 * components:
 *   schemas:
 *     ZaalInput:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *           description: "De unieke identificatie van de zaal."
 *         plaatsen:
 *           type: integer
 *           example: 200
 *           description: "Het aantal beschikbare plaatsen in de zaal."
 *         voorstellingen:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/VoorstellingInput'
 *           description: "Een lijst van voorstellingen die in deze zaal plaatsvinden."
 */
import express, {Request, Response} from 'express';
import { ZaalInput } from '../types';
import zaalService from '../service/zaal.service';

const zaalRouter = express.Router();

/**
 * @swagger
 * /zaal/create:
 *   post:
 *     summary: Maak een nieuwe zaal aan
 *     tags: [Zalen]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ZaalInput'
 *     responses:
 *       200:
 *         description: Zaal succesvol aangemaakt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/ZaalInput'
 *       400:
 *         description: Fout bij het aanmaken van de zaal
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
zaalRouter.post('/create', async (req: Request, res: Response) => {
    try {
        const zaal = <ZaalInput>req.body;
        const result = await zaalService.createZaal(zaal);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
})

/**
 * @swagger
 * /zaal/getAll:
 *   get:
 *     summary: Verkrijg een lijst van alle zalen
 *     tags: [Zalen]
 *     responses:
 *       200:
 *         description: Lijst van zalen succesvol opgehaald
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ZaalInput'
 *       400:
 *         description: Fout bij het ophalen van de zalen
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
zaalRouter.get('/getAll', async (req: Request, res: Response) => {
    try {
        const zalen = await zaalService.getAllZalen();
        res.status(200).json(zalen);
    } catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
})

/**
 * @swagger
 * /zaal/{id}:
 *   get:
 *     summary: Get a zaal by id.
 *     tags: [Zalen]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The zaal id.
 *     responses:
 *       200:
 *         description: A Zaal object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ZaalInput'
 */
zaalRouter.get('/:id', async (req: Request, res: Response) => { 
    try {
        const zaal = await zaalService.getZaalById(Number(req.params.id));
        res.status(200).json(zaal);
    } catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
});


export { zaalRouter };