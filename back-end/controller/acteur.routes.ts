/**
 * @swagger
 * components:
 *   schemas:
 *     ActeurInput:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *           description: "De unieke identificatie van de acteur."
 *         voornaam:
 *           type: string
 *           example: "John"
 *           description: "De voornaam van de acteur."
 *         achternaam:
 *           type: string
 *           example: "Doe"
 *           description: "De achternaam van de acteur."
 *         nationaliteit:
 *           type: string
 *           example: "Belgisch"
 *           description: "De nationaliteit van de acteur."
 *         geboortedatum:
 *           type: string
 *           format: date
 *           example: "1990-01-01"
 *           description: "De geboortedatum van de acteur."
 *         films:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FilmInput'
 *           description: "Een lijst van films waarin de acteur heeft gespeeld."
 */
import express, {Request, Response} from 'express';
import { ActeurInput } from '../types';
import acteurService from '../service/acteur.service';

const acteurRouter = express.Router();

/**
 * @swagger
 * /acteur/create:
 *   post:
 *     summary: Maak een nieuwe acteur aan
 *     tags: [Acteurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActeurInput'
 *     responses:
 *       200:
 *         description: Acteur succesvol aangemaakt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/ActeurInput'
 *       400:
 *         description: Fout bij het aanmaken van de acteur
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
acteurRouter.post('/create', (req: Request, res: Response) => {
    try {
        const acteur = <ActeurInput>req.body;
        const result = acteurService.createActeur(acteur);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
})

/**
 * @swagger
 * /acteur/getAll:
 *   get:
 *     summary: Verkrijg een lijst van alle acteurs
 *     tags: [Acteurs]
 *     responses:
 *       200:
 *         description: Lijst van acteurs succesvol opgehaald
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ActeurInput'
 *       400:
 *         description: Fout bij het ophalen van de acteurs
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
acteurRouter.get('/getAll', async (req: Request, res: Response) => {
    try {
        const acteurs = await acteurService.getAllActeurs();
        res.status(200).json(acteurs);
    } catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
})

export { acteurRouter };