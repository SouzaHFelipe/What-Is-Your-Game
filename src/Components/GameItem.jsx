import React from 'react';

function GameItem({ game }) {
  return (
    <div className="game-item">
      <h3>{game.name}</h3>
      <p>Status: {game.status}</p>
    </div>
  );
}

export default GameItem;
