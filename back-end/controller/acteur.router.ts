import express, {Request, Response} from 'express';
import { ActeurInput } from '../types';
import acteurService from '../service/acteur.service';

const acteurRouter = express.Router();

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

acteurRouter.get('/getAll', (req: Request, res: Response) => {
    try {
        const acteurs = acteurService.getAllActeurs();
        res.status(200).json(acteurs);
    } catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
})

export { acteurRouter };