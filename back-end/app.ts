import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { acteurRouter } from './controller/acteur.router';
import { filmRouter } from './controller/film.router';
import { ticketRouter } from './controller/ticket.router';
import { userRouter } from './controller/user.router';
import { voorstellingRouter } from './controller/voorstelling.router';
import { zaalRouter } from './controller/zaal.router';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

app.use('/acteur', acteurRouter);
app.use('/film', filmRouter);
app.use('/ticket', ticketRouter);
app.use('/user', userRouter);
app.use('/voorstelling', voorstellingRouter);
app.use('/zaal', zaalRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
