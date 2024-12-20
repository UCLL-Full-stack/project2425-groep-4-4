/**
 * @swagger
 *  components:
 *   securitySchemes:
 *    bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 *   schemas:
 *     FilmInput:
 *       type: object
 *       properties:
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
 *         acteurs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ActeurInput'
 *           description: "Een lijst van acteurs die in de film spelen."
 *     DeleteFilm:
 *       type: object
 *       properties:
 *         filmId:         
 *           type: number
 *           format: int64
 *     FilmUpdate:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 101
 *           description: "De unieke identificatie van de film."
 *         titel:
 *           type: string
 *           example: "Inception"
 *           description: "De titel van de film."
 *         speeltijd:
 *           type: integer
 *           example: 148
 *           description: "De duur van de film in minuten."
 *         beschrijving:
 *           type: string
 *           example: "Een dief die technologie gebruikt om in de dromen van mensen te infiltreren."
 *           description: "Een samenvatting van de film."
 *         acteurs:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 42
 *                 description: "De unieke identificatie van de acteur."
 *               voornaam:
 *                 type: string
 *                 example: "Leonardo"
 *                 description: "De voornaam van de acteur."
 *               achternaam:
 *                 type: string
 *                 example: "DiCaprio"
 *                 description: "De achternaam van de acteur."
 *               nationaliteit:
 *                 type: string
 *                 example: "Amerikaans"
 *                 description: "De nationaliteit van de acteur."
 *               geboortedatum:
 *                 type: string
 *                 format: date
 *                 example: "1974-11-11"
 *                 description: "De geboortedatum van de acteur."
 */
import express, {Request, Response} from 'express';
import { FilmInput } from '../types';
import filmService from '../service/film.service';
import { Film } from '../domain/model/film';

const filmRouter = express.Router();

/**
 * @swagger
 * /film/create:
 *   post:
 *     security:
 *      - bearerAuth: []
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
 *     security:
 *      - bearerAuth: []
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
filmRouter.get('/getAll', async (req: Request, res: Response) => {
    try {
        const films = await filmService.getAllFilms();
        res.status(200).json(films);
    } catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
})

/**
 * @swagger
 * /film/{id}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Retrieve a film by its ID
 *     tags: [Films]
 *     description: Fetches a film from the database using its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the film to retrieve
 *     responses:
 *       200:
 *         description: A film object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The film ID
 *                 title:
 *                   type: string
 *                   description: The title of the film
 *                 description:
 *                   type: string
 *                   description: The description of the film
 *                 releaseDate:
 *                   type: string
 *                   format: date
 *                   description: The release date of the film
 *                 genre:
 *                   type: string
 *                   description: The genre of the film
 *       404:
 *         description: Film not found
 *       500:
 *         description: Internal server error
 */
filmRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const film = await filmService.getFilmById(Number(req.params.id));
        res.status(200).json(film);
    } catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
});

/**
 * @swagger
 * /film/delete:
 *   delete:
 *     summary: Delete a film in the database.
 *     tags: [Films]
 *     description: Deletes a film based on the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/DeleteFilm'
 *     responses:
 *       200:
 *         description: Successful deletion of film.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FilmInput'
 *       500:
 *         description: Internal server error.
 */
filmRouter.delete('/delete', async (req: Request, res: Response) => {
    try {
        const filmId = <number>req.body.filmId;

        const film = await filmService.deleteFilmWithId({ filmId });
        res.status(200).json(film)
    }
    catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
});

/**
 * @swagger
 * /film/update:
 *   put:
 *     summary: Update een bestaande film
 *     tags: [Films]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FilmUpdate'
 *     responses:
 *       200:
 *         description: film succesvol geüpdatet
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
 *         description: Fout bij het updaten van de film
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
filmRouter.put('/update', async (req: Request, res: Response) => {
    try {
        const film = <Film>req.body;
        const result = filmService.updateFilm(film);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
})

export { filmRouter };