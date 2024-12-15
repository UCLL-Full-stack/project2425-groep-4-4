/**
 * @swagger
 * components:
 *   schemas:
 *     UserInput:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *           description: "De unieke identificatie van de gebruiker."
 *         admin:
 *           type: boolean
 *           example: false
 *           description: "Geeft aan of de gebruiker admin-rechten heeft."
 *         voornaam:
 *           type: string
 *           example: "Jan"
 *           description: "De voornaam van de gebruiker."
 *         achternaam:
 *           type: string
 *           example: "Janssens"
 *           description: "De achternaam van de gebruiker."
 *         email:
 *           type: string
 *           example: "jan.janssens@example.com"
 *           description: "Het e-mailadres van de gebruiker."
 *         password:
 *           type: string
 *           example: "veiligWachtwoord123"
 *           description: "Het wachtwoord van de gebruiker."
 *         tickets:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TicketInput'
 *           description: "Een lijst van tickets die aan de gebruiker zijn toegewezen."
 */
import express, {Request, Response} from 'express';
import { UserInput } from '../types';
import userService from '../service/user.service';

const userRouter = express.Router();

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Maak een nieuwe gebruiker aan
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: Gebruiker succesvol aangemaakt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/UserInput'
 *       400:
 *         description: Fout bij het aanmaken van de gebruiker
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
userRouter.post('/create', (req: Request, res: Response) => {
    try {
        const user = <UserInput>req.body;
        const result = userService.createUser(user);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
})

/**
 * @swagger
 * /user/getAll:
 *   get:
 *     summary: Verkrijg een lijst van alle gebruikers
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lijst van gebruikers succesvol opgehaald
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserInput'
 *       400:
 *         description: Fout bij het ophalen van de gebruikers
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
userRouter.get('/getAll', async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        console.log("controller:");
        console.log(users);
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
})

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get an user by id.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The acteur id.
 *     responses:
 *       200:
 *         description: An User object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInput'
 */
userRouter.get('/:id', async (req: Request, res: Response) => { 
    try {
        const user = await userService.getUserById(Number(req.params.id));
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
});

export { userRouter };