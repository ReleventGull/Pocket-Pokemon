import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {fetchAllPokemon, fetchAllMoves, fetchPokemonById, fetchPokemonRates, fetchPokemonLevels} from "./apiCalls/index"
import Game from './Game';

const App = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [pokemon, setPokemon] = useState([]);
    const [pokemonMoves, setPokemonMoves] = useState([])
    const [starters, setStarters] = useState([])
    const [loadBar, setLoadBar] = useState(0)

  



    

    
    
    useEffect(() => {
      let pokeObject = []
      let numberofPokemon = 7
    const getAllPokemon = async () => {
          for (let i = 1; i <=numberofPokemon; i++) {
            setLoadBar(i/numberofPokemon)
            let pokemonStats = await fetchPokemonRates(i)
            let pokeMon = await fetchPokemonById(i)
            let rate_experience =  pokemonStats.growth_rate.name.split('-').join(' ')
            if (pokeMon.types[1]) {
              pokeObject.push({
                name: pokeMon.name,
                type1: pokeMon.types[0].type.name,
                type2: pokeMon.types[1].type.name,
                base_experience: pokeMon.base_experience,
                stats: pokeMon.stats,
                catch_rate: pokemonStats.capture_rate,
                legendary: pokemonStats.is_legendary,
                mythical: pokemonStats.is_mythical,
                experience_rate: rate_experience
                 })
            }else {
              pokeObject.push({
                name: pokeMon.name,
                type1: pokeMon.types[0].type.name,
                base_experience: pokeMon.base_experience,
                stats: pokeMon.stats,
                catch_rate: pokemonStats.capture_rate,
                legendary: pokemonStats.is_legendary,
                mythical: pokemonStats.is_mythical,
                experience_rate: rate_experience
                 })
            }
            for(let i = 1; i <= 6; i++){
            
              const result = await fetchPokemonLevels(i)
              pokeObject.forEach(poke => {
                if(poke.experience_rate === result.descriptions[2].description) {
                  poke['levels'] = result.levels               
                }
              })
            }
          }
          
        const moves = await fetchAllMoves()
        setPokemon(pokeObject);
        setPokemonMoves(moves);
        const filterPokemon = pokeObject.filter(pok => pok.name == 'bulbasaur' || pok.name == 'charmander' || pok.name == 'squirtle')
        setStarters(filterPokemon)
        setIsLoaded(true)
      }
      getAllPokemon()
    }, [isLoaded]
    )

    return (
 
    isLoaded && starters ? 
  
    <Game  starters={starters} pokemonMoves={pokemonMoves} pokemon={pokemon}/>:
    <div className='loadingBar'>
      <h1 >Loading...</h1>
    <progress value={loadBar} max='1'></progress>
    </div>

    
    
    
    
    );
}


const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
