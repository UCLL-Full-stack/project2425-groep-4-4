import express, {Request, Response} from 'express';
import { VoorstellingInput } from '../types';
import voorstellingService from '../service/voorstelling.service';

const voorstellingRouter = express.Router();

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

voorstellingRouter.get('/getAll', (req: Request, res: Response) => {
    try {
        const voorstellingen = voorstellingService.getAllVoorstellingen();
        res.status(200).json(voorstellingen);
    } catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
})

export { voorstellingRouter };