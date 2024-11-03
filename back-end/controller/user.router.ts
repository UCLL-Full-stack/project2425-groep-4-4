import express, {Request, Response} from 'express';
import { UserInput } from '../types';
import userService from '../service/user.service';

const userRouter = express.Router();

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

userRouter.get('/getAll', (req: Request, res: Response) => {
    try {
        const users = userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({status: 'error', message: (error as Error).message});
    }
})

export { userRouter };