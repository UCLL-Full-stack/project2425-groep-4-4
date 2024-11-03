import express, {Request, Response} from 'express';
import { ZaalInput } from '../types';
import zaalService from '../service/zaal.service';

const zaalRouter = express.Router();

zaalRouter.post('/create', (req: Request, res: Response) => {
    try {
        const zaal = <ZaalInput>req.body;
        const result = zaalService.createZaal(zaal);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
})

zaalRouter.get('/getAll', (req: Request, res: Response) => {
    try {
        const zalen = zaalService.getAllZalen();
        res.status(200).json(zalen);
    } catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
})

export { zaalRouter };