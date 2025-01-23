import React, { useState } from 'react';

function AddGameForm({ onAddGame }) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Para Jogar');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddGame({ name, status });
    setName('');
    setStatus('Para Jogar');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome do jogo"
        required
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Para Jogar">Para Jogar</option>
        <option value="Jogando">Jogando</option>
        <option value="Jogou">Jogou</option>
      </select>
      <button type="submit">Adicionar Jogo</button>
    </form>
  );
}

export default AddGameForm;
