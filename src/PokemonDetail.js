import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './App.css'; 

function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('#f9f9f9'); // Default background color

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => response.json())
      .then(data => {
        setPokemon(data);
        const type = data.types[0].type.name;
        setBackgroundColor(getTypeColor(type));
      })
      .catch(error => console.error(error));
  }, [name]);

  const getTypeColor = (type) => {
    const typeColors = {
      grass: '#7AC74C',
      water: '#6390F0',
      fire: '#F74260',
      electric: '#F7D02C',
      ice: '#96D9D6',
      fighting: '#C22E28',
      poison: '#A33EA1',
      ground: '#E2BF65',
      flying: '#A98FF3',
      psychic: '#F95587',
      bug: '#A6B91A',
      rock: '#B6A136',
      ghost: '#735797',
      dragon: '#6F35FC',
      dark: '#705746',
      steel: '#B7B7CE',
      fairy: '#D685AD',
      normal: '#A8A77A'
    };
    return typeColors[type] || '#f9f9f9'; // Default to #f9f9f9 if type not found
  };

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="PokemonDetail" style={{ backgroundColor }}>
      <h2>{pokemon.name.toUpperCase()}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <div className="PokemonDetail-info">
        <p><strong>Height:</strong> {pokemon.height}</p>
        <p><strong>Weight:</strong> {pokemon.weight}</p>
        <p><strong>Type:</strong> {pokemon.types.map(type => type.type.name).join(', ')}</p>

        <h3>Abilities</h3>
        <ul>
          {pokemon.abilities.map((ability, index) => (
            <li key={index}>{ability.ability.name}</li>
          ))}
        </ul>

        <h3>Stats</h3>
        <ul className="PokemonDetail-stats">
          {pokemon.stats.map((stat, index) => (
            <li key={index}>
              <strong>{stat.stat.name.toUpperCase()}:</strong>
              <div className="stat-bar">
                <div
                  className="stat-bar-fill"
                  style={{ width: `${stat.base_stat}%` }}
                >
                  {stat.base_stat}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <h3>Moves</h3>
        <ul className="PokemonDetail-moves">
          {pokemon.moves.slice(0, 10).map((move, index) => (
            <li key={index}>{move.move.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PokemonDetail;
