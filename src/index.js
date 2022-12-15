import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {NameDisplay} from './Exported'
import {fetchAllPokemon, fetchAllMoves} from "./apiCalls/index"
import Game from './Game';

const App = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [pokemon, setPokemon] = useState([]);
    const [pokemonMoves, setPokemonMoves] = useState([])

    useEffect(() => {
        const getAllPokemon = async () => {
        const pokemon = await fetchAllPokemon()
        const moves = await fetchAllMoves()
        console.log('Api call for moves', moves)
        setPokemon(pokemon);
        setPokemonMoves(moves);
        setIsLoaded(true)
      }
      getAllPokemon()
    }, []
    )
   
    return (
    
    
    isLoaded ? 
    <Game pokemonMoves={pokemonMoves} pokemon={pokemon}/>
    :
    <NameDisplay/>

    
    
    
    
    );
}


const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
