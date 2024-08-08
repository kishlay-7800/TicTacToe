import express from 'express';
import TicTacToeGameModel from '../models/tic-tac-toe-game.js';
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';

console.log(TicTacToeGameModel);

export const router = express.Router();

router.get('/', async function(req, res) {
  const all_data = await TicTacToeGameModel.find({})
  
  console.log(all_data)
  res.json(all_data)

});

router.post('/', async function(req, res) {
  // To be implemented
  // var ObjectID = require('mongodb').ObjectID;
  const { history } = req.body;
  console.log(req.body)
  var hist = {
    'history':history
  }
  const newGame = new TicTacToeGameModel(hist)
  await newGame.save()
  // await TicTacToeGameModel.insertMany([hist])
  console.log(newGame)

  res.json(newGame._id) 
});

router.get('/:id', async function(req, res) {

  let id_data = await TicTacToeGameModel.findOne({_id:req.params.id})

  res.json(id_data)
  // To be implemented  
});

router.patch('/:id', async function(req, res) {
  // To be implemented
  console.log(req.params.id)
  console.log("Hello World")
  const { history } = req.body;
  console.log(history)
 const  completion = await TicTacToeGameModel.updateOne(
    { "_id" : req.params.id },
      { $set: { "history" : history } }
  )
  res.json(completion)
});