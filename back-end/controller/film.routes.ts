/**
 * @swagger
 * components:
 *   schemas:
 *     FilmInput:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *           description: "De unieke identificatie van de film."
 *         titel:
 *           type: string
 *           example: "The Matrix"
 *           description: "De titel van de film."
 *         speeltijd:
 *           type: integer
 *           example: 120
 *           description: "De speeltijd van de film in minuten."
 *         beschrijving:
 *           type: string
 *           example: "Een spannende thriller over een moordonderzoek."
 *           description: "Een korte beschrijving van de film."
 *         voorstellingen:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/VoorstellingInput'
 *           description: "Een lijst van voorstellingen voor deze film."
 *         acteurs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ActeurInput'
 *           description: "Een lijst van acteurs die in de film spelen."
 */
import express, {Request, Response} from 'express';
import { FilmInput } from '../types';
import filmService from '../service/film.service';

const filmRouter = express.Router();

/**
 * @swagger
 * /film/create:
 *   post:
 *     summary: Maak een nieuwe film aan
 *     tags: [Films]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FilmInput'
 *     responses:
 *       200:
 *         description: Film succesvol aangemaakt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/FilmInput'
 *       400:
 *         description: Fout bij het aanmaken van de film
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
filmRouter.post('/create', (req: Request, res: Response) => {
    try {
        const film = <FilmInput>req.body;
        const result = filmService.createFilm(film);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
})

/**
 * @swagger
 * /film/getAll:
 *   get:
 *     summary: Verkrijg een lijst van alle films
 *     tags: [Films]
 *     responses:
 *       200:
 *         description: Lijst van films succesvol opgehaald
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FilmInput'
 *       400:
 *         description: Fout bij het ophalen van de films
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
filmRouter.get('/getAll', (req: Request, res: Response) => {
    try {
        const tickets = filmService.getAllFilms();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
})

export { filmRouter };