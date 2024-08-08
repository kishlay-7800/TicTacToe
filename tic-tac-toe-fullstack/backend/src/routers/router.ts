import express from 'express';
import { router as ticTacToeGameRouter } from './tic-tac-toe-game.js';

export const router = express.Router();

router.use('/tic-tac-toe-games', ticTacToeGameRouter);