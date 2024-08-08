import mongoose from 'mongoose';
import { db } from '../database.js';
const ticTacToeGameSchema = new mongoose.Schema({
    history: { type: Array },
});
const TicTacToeGameModel = db.model('TicTacToeGame', ticTacToeGameSchema);
export default TicTacToeGameModel;
