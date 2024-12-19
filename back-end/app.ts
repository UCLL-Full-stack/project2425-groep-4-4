import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { acteurRouter } from './controller/acteur.routes';
import { filmRouter } from './controller/film.routes';
import { ticketRouter } from './controller/ticket.routes';
import { userRouter } from './controller/user.routes';
import { voorstellingRouter } from './controller/voorstelling.routes';
import { zaalRouter } from './controller/zaal.routes';
import { info } from 'console';
import { title } from 'process';
import { version } from 'os';
import { expressjwt } from 'express-jwt';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret', 
        algorithms: ['HS256'],
    }).unless({
        path: ['api-docs', /^\/api-docs\/.*/, '/user/login', '/user/create'],
    })
)


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

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Cinema API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'], 
};

const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
