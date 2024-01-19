import React, { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import ReactDOM from "react-dom/client";
import {fetchAllPokemon} from "./apiCalls/index"
import { seedItems, fetchItems, uploadLevels, uploadingPokemon, fetchPokemonById, fetchPokemonRates, fetchPokemonLevels, fetchMoves, seedMoves } from "./apiCalls/seedApi";
import Game from './Game';
import {Register, Login} from "./Exported";






const App = () => {
    const [token, setToken] = useState(window.localStorage.getItem('token') || '')
    const [isLoaded, setIsLoaded] = useState(false);
    const [pokemon, setPokemon] = useState([]);
    const [loadBar, setLoadBar] = useState(0)
    //For seeding all the pokemon, acts as a toggle. If pokemon is present in the database, set to false, if not , set to true
    const [seedData, setSeedData] = useState(false)
    //
    const navigate = useNavigate()
    let numberofPokemon = 10
    

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
    const fetchSeedMoves = async() => {
      for(let b = 1; b <= 60; b++) {
        const result = await fetchMoves(b)
        if(result.power == null) continue


        seedMoves({
          name: result.name,
          type: result.type.name,
          category: result.damage_class.name,
          pp: result.pp,
          power: result.power,
          accuracy: result.accuracy,
          learnedBy: result.learned_by_pokemon
  
      })
    }
    return
  }
const fetchSeedItems = async() => {
  for(let i = 1; i <= 70; i++) {
    let response = await  fetchItems(i)
    if((response.category.name == 'standard-balls' || response.category.name == 'revival' || response.category.name == 'healing' || response.category.name == 'status-cures' || response.category.name == 'pp-recovery' || response.category.name == 'stat-boosts') && response.cost > 0){
      console.log(response)
      console.log(response.cost)
      await seedItems({name: response.name, category: response.category.name, description: response.effect_entries[0].effect, cost: response.cost})
    }else {
      console.log(response.category.name)
    }
 
  }
  
}
    const seedPokeData = async() => {
      for(let i = 1; i <= 6; i++){
        const result = await fetchPokemonLevels(i)
         await uploadLevels({name: result.name, levels: result.levels})
      }
      await fetchSeedItems()
      await seedPokemon()
      await fetchSeedMoves()
      await fetchGameData()
    }
    const fetchGameData = async() => {
      let allPokemon = await fetchAllPokemon()
      setPokemon(allPokemon)
      setIsLoaded(true)

    }
    
    useEffect(() => {
      if(seedData) {
        window.localStorage.removeItem('token')
        seedPokeData()
      }else {
        fetchGameData()
      }
    }, [])
    useEffect(() => {
      if (!token) {
        navigate('/register')
      }
    }, [])
    
    // isLoaded && pokemon ? 
    // token ?

    return (
    seedData ? <h2>Seeding Data</h2> :
      
   <Routes>
    <Route path='/' element={<Game token={token} pokemon={pokemon}/>}/>
    <Route path='/register' element={<Register setToken={setToken}/>}/>
    <Route path='/login' element={<Login setToken={setToken} />}/>
  </Routes>
    );
}


const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
