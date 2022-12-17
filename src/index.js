import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {fetchAllPokemon, fetchAllMoves, fetchPokemonById } from "./apiCalls/index"
import Game from './Game';

const App = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [pokemon, setPokemon] = useState([]);
    const [pokemonMoves, setPokemonMoves] = useState([])
    const [poke, setPoke] = useState([])
  console.log(pokemon)
    let pokeObject = []
    
    useEffect(() => {
    const getAllPokemon = async () => {
          for (let i = 1; i <= 28; i++) {
            let pokeMon = await fetchPokemonById(i)
            if (pokeMon.types[1]) {
              pokeObject.push({
                name: pokeMon.name,
                type1: pokeMon.types[0].type.name,
                type2: pokeMon.types[1].type.name,
                base_experience: pokeMon.base_experience,
                stats: pokeMon.stats
                 })
            }else {
              pokeObject.push({
                name: pokeMon.name,
                type1: pokeMon.types[0].type.name,
                base_experience: pokeMon.base_experience,
                stats: pokeMon.stats
                 })
            }
        
            console.log('This poke object', pokeObject)
          }
        
        
          const pokemon = await fetchAllPokemon()
        const moves = await fetchAllMoves()
        setPokemon(pokeObject);
        setPokemonMoves(moves);
        setIsLoaded(true)
        
      }
      getAllPokemon()
    }, []
    )
    
    return (
    
    
    isLoaded  == true ? 
    <Game pokemonMoves={pokemonMoves} pokemon={pokemon}/>
    :
    null

    
    
    
    
    );
}


const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
