import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css'; 

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getTypeClassName = (type) => {
  switch (type) {
    case 'grass': return 'grass';
    case 'water': return 'water';
    case 'fire': return 'fire';
    case 'electric': return 'electric';
    case 'ice': return 'ice';
    case 'fighting': return 'fighting';
    case 'poison': return 'poison';
    case 'ground': return 'ground';
    case 'flying': return 'flying';
    case 'psychic': return 'psychic';
    case 'bug': return 'bug';
    case 'rock': return 'rock';
    case 'ghost': return 'ghost';
    case 'dragon': return 'dragon';
    case 'dark': return 'dark';
    case 'steel': return 'steel';
    case 'fairy': return 'fairy';
    case 'normal': return 'normal';
    default: return '';
  }
};

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [weaknessFilter, setWeaknessFilter] = useState('all');
  const [abilityFilter, setAbilityFilter] = useState('all');

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(data => {
        const fetches = data.results.map(pokemon =>
          fetch(pokemon.url)
            .then(response => response.json())
            .then(pokemonData => ({
              name: capitalizeFirstLetter(pokemonData.name),
              image: pokemonData.sprites.front_default,
              types: pokemonData.types.map(type => type.type.name),
              abilities: pokemonData.abilities.map(ability => ability.ability.name),
              stats: pokemonData.stats.reduce((acc, stat) => {
                acc[stat.stat.name] = stat.base_stat;
                return acc;
              }, {})
            }))
        );

        Promise.all(fetches).then(results => setPokemons(results));
      })
      .catch(error => console.error(error));
  }, []);

  const filteredPokemons = pokemons.filter(pokemon => {
    const nameMatch = pokemon.name.toLowerCase().includes(search.toLowerCase());
    const typeMatch = typeFilter === 'all' || pokemon.types.includes(typeFilter);
    const abilityMatch = abilityFilter === 'all' || pokemon.abilities.includes(abilityFilter);

    // Define weaknesses
    const weaknesses = {
      fire: ['grass', 'bug', 'ice', 'steel'],
      water: ['fire', 'ground', 'rock'],
      electric: ['water', 'flying'],
      grass: ['water', 'ground', 'rock'],
      ice: ['grass', 'ground', 'flying', 'dragon'],
      fighting: ['normal', 'ice', 'rock', 'dark', 'steel'],
      poison: ['grass', 'fairy'],
      ground: ['fire', 'electric', 'poison', 'rock', 'steel'],
      flying: ['grass', 'fighting', 'bug'],
      psychic: ['fighting', 'poison'],
      bug: ['grass', 'psychic', 'dark'],
      rock: ['fire', 'ice', 'flying', 'bug'],
      ghost: ['psychic', 'ghost'],
      dragon: ['dragon'],
      dark: ['psychic', 'ghost'],
      steel: ['ice', 'rock', 'fairy'],
      fairy: ['fighting', 'bug', 'dark'],
      normal: [],
    };
    
    const weaknessMatch = weaknessFilter === 'all' || (weaknesses[weaknessFilter] && weaknesses[weaknessFilter].some(weakness => pokemon.types.includes(weakness)));

    return nameMatch && typeMatch && abilityMatch && weaknessMatch;
  });

  return (
    <div className="PokemonList">

      {/* Search and Filters */}
      <div className="filters">
        <div className="search-filter">
          <input
            id="search"
            type="text"
            placeholder="Search Pokemon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="type-ability-weakness">
          <div className="filter-item">
            <select
              id="type-filter"
              onChange={(e) => setTypeFilter(e.target.value)}
              value={typeFilter}
            >
              <option value="all">Type</option>
              <option value="grass">Grass</option>
              <option value="water">Water</option>
              <option value="fire">Fire</option>
              <option value="electric">Electric</option>
              <option value="ice">Ice</option>
              <option value="fighting">Fighting</option>
              <option value="poison">Poison</option>
              <option value="ground">Ground</option>
              <option value="flying">Flying</option>
              <option value="psychic">Psychic</option>
              <option value="bug">Bug</option>
              <option value="rock">Rock</option>
              <option value="ghost">Ghost</option>
              <option value="dragon">Dragon</option>
              <option value="dark">Dark</option>
              <option value="steel">Steel</option>
              <option value="fairy">Fairy</option>
              <option value="normal">Normal</option>
            </select>
          </div>

          <div className="filter-item">
            <select
              id="ability-filter"
              onChange={(e) => setAbilityFilter(e.target.value)}
              value={abilityFilter}
            >
              <option value="all">Ability</option>
              <option value="overgrow">Overgrow</option>
              <option value="blaze">Blaze</option>
              <option value="torrent">Torrent</option>
              <option value="run-away">Run Away</option>
            </select>
          </div>

          <div className="filter-item">
            <select
              id="weakness-filter"
              onChange={(e) => setWeaknessFilter(e.target.value)}
              value={weaknessFilter}
            >
              <option value="all">Weakness</option>
              <option value="fire">Fire</option>
              <option value="water">Water</option>
              <option value="electric">Electric</option>
              <option value="grass">Grass</option>
              <option value="ice">Ice</option>
              <option value="fighting">Fighting</option>
              <option value="poison">Poison</option>
              <option value="ground">Ground</option>
              <option value="flying">Flying</option>
              <option value="psychic">Psychic</option>
              <option value="bug">Bug</option>
              <option value="rock">Rock</option>
              <option value="ghost">Ghost</option>
              <option value="dragon">Dragon</option>
              <option value="dark">Dark</option>
              <option value="steel">Steel</option>
              <option value="fairy">Fairy</option>
              <option value="normal">Normal</option>
            </select>
          </div>
        </div>
      </div>

      <div className="PokemonList-grid">
        {filteredPokemons.map((pokemon, index) => (
          <div className="PokemonList-item" key={index}>
            <Link to={`/pokemon/${pokemon.name.toLowerCase()}`}>
              <img src={pokemon.image} alt={pokemon.name} />
              <h3>{pokemon.name}</h3>
              <div className="PokemonList-types">
                {pokemon.types.map(type => (
                  <div key={type} className={`PokemonList-type ${getTypeClassName(type)}`}>
                    {capitalizeFirstLetter(type)}
                  </div>
                ))}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
