const handleDeleteSelected = async () => {
    for (const index of selectedGames) {
      const game = games[index];
      console.log(`Deleting game with ID: ${game._id}`); // Adicione este console.log para verificar o ID
      try {
        await axios.delete(`http://localhost:5000/games/${game._id}`);
        console.log(`Successfully deleted game with ID: ${game._id}`); // Verifique se a exclusão foi bem-sucedida
      } catch (error) {
        console.error('Error deleting game:', error);
      }
    }
    setGames(games.filter(game => !selectedGames.includes(game)));
    setSelectedGames([]);
  };
  