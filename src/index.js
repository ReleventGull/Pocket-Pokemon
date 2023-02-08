import e from "cors";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {fetchAllPokemon, fetchAllMoves} from "./apiCalls/index"
import { uploadLevels, uploadingPokemon, fetchPokemonById, fetchPokemonRates, fetchPokemonLevels,getAllLevels } from "./apiCalls/seedApi";
import Game from './Game';

const App = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [pokemon, setPokemon] = useState([]);
    const [pokemonMoves, setPokemonMoves] = useState([])
    const [starters, setStarters] = useState([])
    const [loadBar, setLoadBar] = useState(0)
    
    //For seeding all the pokemon, acts as a toggle. If pokemon is present in the database, set to false, if not , set to true
    const [seedData, setSeedData] = useState(false)
    //
    let numberofPokemon = 40
    const seedPokemon = async() => {
      for(let i=1; i <= numberofPokemon; i++)  {
        let pokemonStats = await fetchPokemonRates(i)
        let pokeMon = await fetchPokemonById(i)
        if (pokeMon.types[1]) {
          await uploadingPokemon({
            name: pokeMon.name,
            type1: pokeMon.types[0].type.name,
            type2: pokeMon.types[1].type.name,
            base_experience: pokeMon.base_experience,
            stats: pokeMon.stats,
            catch_rate: pokemonStats.capture_rate,
            legendary: pokemonStats.is_legendary,
            mythical: pokemonStats.is_mythical,
            experience_rate: pokemonStats.growth_rate.name
            })
        }else {
          await uploadingPokemon({
            name: pokeMon.name,
            type1: pokeMon.types[0].type.name,
            base_experience: pokeMon.base_experience,
            stats: pokeMon.stats,
            catch_rate: pokemonStats.capture_rate,
            legendary: pokemonStats.is_legendary,
            mythical: pokemonStats.is_mythical,
            experience_rate: pokemonStats.growth_rate.name
            })
        }
      }
    }
    const seedPokeData = async() => {
      for(let i = 1; i <= 6; i++){
        const result = await fetchPokemonLevels(i)
        await uploadLevels({name: result.name, levels: result.levels})
      }
        await seedPokemon()
    }

    const fetchGameData = async() => {
      let allPokemon = await fetchAllPokemon()
      setPokemon(allPokemon)
      setIsLoaded(true)
      console.log(allPokemon)
    }
    useEffect(() => {
      if(seedData) {
        seedPokeData()
      }else {
        fetchGameData()
      }
    }, [])
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
