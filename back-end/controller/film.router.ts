import express, {Request, Response} from 'express';
import { FilmInput } from '../types';
import filmService from '../service/film.service';

const filmRouter = express.Router();

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

filmRouter.get('/getAll', (req: Request, res: Response) => {
    try {
        const tickets = filmService.getAllFilms();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
})

export { filmRouter };