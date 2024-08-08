import express, { json } from 'express';
import cors from 'cors';
import { router } from './routers/router.js';
export const app = express();
app.use(json());
app.use(cors());
app.use('/', router);
app.listen(8000);
