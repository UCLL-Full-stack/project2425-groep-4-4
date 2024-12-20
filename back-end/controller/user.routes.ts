/**
 * @swagger
 *  components:
 *   securitySchemes:
 *    bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 *   schemas:
 *     AuthenticationResponse:
 *         type: object
 *         properties:
 *           message:
 *             type: string
 *             description: Authentication response.
 *           token:
 *             type: string
 *             description: JWT access token.
 *           email:
 *             type: string
 *             description: User name.
 *           fullname:
 *            type: string
 *            description: Full name.
 *     AuthenticationRequest:
 *         type: object
 *         properties:
 *           email:
 *             type: string
 *             example: "admin@cinema.com"
 *             description: email
 *           password:
 *             type: string
 *             example: "admin123"
 *             description: User password.
 *     User:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *           password:
 *             type: string
 *             description: User password.
 *           firstName:
 *             type: string
 *             description: First name.
 *           lastName:
 *             type: string
 *             description: Last name.
 *           email:
 *             type: string
 *             description: E-mail.
 *           role:
 *              $ref: '#/components/schemas/Role'
 *     UserInput:
 *       type: object
 *       properties:
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
 *     Role:
 *         type: string
 *         enum: [user, admin, regisseur]
 *     email:
 *      type: object
 *      properties:
 *        email:
 *         type: string
 *         example: "admin@cinema.com"
 */
import express, {Request, Response} from 'express';
import { UserInput } from '../types';
import userService from '../service/user.service';

const userRouter = express.Router();

/**
 * @swagger
 * /user/create:
 *   post:
 *      summary: Create a user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserInput'
 *      responses:
 *         200:
 *            description: The created user object
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/User'
 */
userRouter.post('/create', async (req: Request, res: Response) => {
    try {
        const user = <UserInput>req.body;
        const result = await userService.createUser(user);
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
 *     security:
 *      - bearerAuth: []
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
 *                 $ref: '#/components/schemas/User'
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
 *               $ref: '#/components/schemas/User'
 */
userRouter.get('/:id', async (req: Request, res: Response) => { 
    try {
        const user = await userService.getUserById(Number(req.params.id));
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
});

/**
 * @swagger
 * /user/email:
 *   get:
 *     summary: Get an user by email.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/email'
 *     responses:
 *       200:
 *         description: An User object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.get('/email', async (req: Request, res: Response) => { 
    try {
        const email = req.body
        const user = await userService.getUserByEmail(email);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
});


/**
 * @swagger
 * /user/login:
 *   post:
 *      summary: Login using username/password. Returns an object with JWT token and user name when succesful.
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AuthenticationRequest'
 *      responses:
 *         200:
 *            description: The created user object
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/AuthenticationResponse'
 */
userRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const user = <UserInput>req.body;
        const response = await userService.authenticate(user)
        res.status(200).json({message: 'authentication succesful', ...response});
    } catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
})

export { userRouter };