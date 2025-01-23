import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://felipehenrique969:x5ei9mJuJaYb4Nsw@cluster0.8f9vn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

const gameSchema = new mongoose.Schema({
  name: String,
  status: String
});

const Game = mongoose.model('Game', gameSchema);

app.get('/games', async (req, res) => {
  const games = await Game.find();
  res.json(games);
});

app.post('/games', async (req, res) => {
  const newGame = new Game(req.body);
  await newGame.save();
  res.json(newGame);
});

app.delete('/games/:id', async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json({ message: 'Game deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting game', error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
