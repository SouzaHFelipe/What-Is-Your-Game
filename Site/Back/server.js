const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Conecte ao MongoDB Atlas
const uri = "YOUR_MONGODB_URI";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// Schema e Modelo
const gameSchema = new mongoose.Schema({
  name: String,
  status: String
});

const Game = mongoose.model('Game', gameSchema);

// Rotas
app.get('/games', async (req, res) => {
  const games = await Game.find();
  res.json(games);
});

app.post('/games', async (req, res) => {
  const newGame = new Game(req.body);
  await newGame.save();
  res.json(newGame);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
