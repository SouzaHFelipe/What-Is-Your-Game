import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddGameForm from './Components/AddGameForm'; // Importa o componente AddGameForm
import './App.css';

function App() {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGames, setSelectedGames] = useState([]);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get('http://localhost:5000/games');
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const handleAddGame = async (game) => {
    try {
      const response = await axios.post('http://localhost:5000/games', game);
      setGames([...games, response.data]);
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  const handleDeleteSelected = async () => {
    const remainingGames = [];
    for (const index of selectedGames) {
      const game = games[index];
      console.log(`Deleting game with ID: ${game._id}`); // Adicione este console.log para verificar o ID
      try {
        await axios.delete(`http://localhost:5000/games/${game._id}`);
        console.log(`Successfully deleted game with ID: ${game._id}`); // Verifica se a exclusão foi bem-sucedida
        remainingGames.push(game);
      } catch (error) {
        console.error('Error deleting game:', error);
      }
    }
    setGames(games.filter(game => !remainingGames.includes(game)));
    setSelectedGames([]);
  };

  const handleSelectGame = (index) => {
    setSelectedGames(prevSelected => 
      prevSelected.includes(index)
        ? prevSelected.filter(i => i !== index)
        : [...prevSelected, index]
    );
  };

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <AddGameForm onAddGame={handleAddGame} />
      <input
        type="text"
        placeholder="Buscar nome..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <ul className="game-list">
        {filteredGames.map((game, index) => (
          <li 
            key={game._id} 
            className={`game-item ${selectedGames.includes(index) ? 'selected' : ''}`}
            onClick={() => handleSelectGame(index)}
          >
            {game.name} - {game.status}
          </li>
        ))}
      </ul>
      <button 
        onClick={handleDeleteSelected}
        className="delete-selected-btn"
        disabled={selectedGames.length === 0}
      >
        Excluir Selecionados
      </button>
    </div>
  );
}

export default App;
