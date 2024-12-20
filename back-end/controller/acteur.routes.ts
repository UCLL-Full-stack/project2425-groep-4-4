/**
 * @swagger
 *  components:
 *   securitySchemes:
 *    bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
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
 *           example: "1985-06-15T00:00:00.000Z"
 *           description: "De geboortedatum van de acteur."
 *         films:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FilmInput'
 *           description: "Een lijst van films waarin de acteur heeft gespeeld."
 *     DeleteActeur:
 *       type: object
 *       properties:
 *         filmId:         
 *           type: number
 *           format: int64
 *     ActeurUpdate:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 42
 *           description: "De unieke identificatie van de acteur."
 *         voornaam:
 *           type: string
 *           example: "Jan"
 *           description: "De voornaam van de acteur."
 *         achternaam:
 *           type: string
 *           example: "Janssen"
 *           description: "De achternaam van de acteur."
 *         nationaliteit:
 *           type: string
 *           example: "Belgisch"
 *           description: "De nationaliteit van de acteur."
 *         geboortedatum:
 *           type: string
 *           format: date
 *           example: "1985-06-15T00:00:00.000Z"
 *           description: "De geboortedatum van de acteur."
 */
import express, {Request, Response} from 'express';
import { ActeurInput } from '../types';
import acteurService from '../service/acteur.service';
import { Acteur } from '../domain/model/acteur';

const acteurRouter = express.Router();

/**
 * @swagger
 * /acteur/create:
 *   post:
 *     security:
 *      - bearerAuth: []
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
 *     security:
 *      - bearerAuth: []
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

/**
 * @swagger
 * /acteur/{id}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get an acteur by id.
 *     tags: [Acteurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The acteur id.
 *     responses:
 *       200:
 *         description: An acteur object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ActeurInput'
 */
acteurRouter.get('/:id', async (req: Request, res: Response) => { 
    try {
        const acteur = await acteurService.getActeurById(Number(req.params.id));
        res.status(200).json(acteur);
    } catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
});

/**
 * @swagger
 * /acteur/delete:
 *   delete:
 *     summary: Delete an acteur in the database.
 *     tags: [Acteurs]
 *     description: Deletes an acteur based on the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/DeleteActeur'
 *     responses:
 *       200:
 *         description: Successful deletion of acteur.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ActeurInput'
 *       500:
 *         description: Internal server error.
 * 
 */
acteurRouter.delete('/delete', async (req: Request, res: Response) => {
    try {
        const acteurId = <number>req.body.filmId;

        const acteur = await acteurService.deleteActeurWithId({ acteurId });
        res.status(200).json(acteur)
    }
    catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
});

/**
 * @swagger
 * /acteur/update:
 *   put:
 *     summary: Update een bestaande acteur
 *     tags: [Acteurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActeurUpdate'
 *     responses:
 *       200:
 *         description: acteur succesvol geüpdatet
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
acteurRouter.put('/update', async (req: Request, res: Response) => {
    try {
        const acteur = <Acteur>req.body;
        const result = acteurService.updateActeur(acteur);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
})


export { acteurRouter };