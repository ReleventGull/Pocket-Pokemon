import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {fetchAllPokemon} from "./apiCalls/index"
import Game from './Game';

const App = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        const getAllPokemon = async () => {
        const pokemon = await fetchAllPokemon()
        console.log('Pokemon from api', pokemon)
        setPokemon(pokemon);
        setIsLoaded(true)
      }
      getAllPokemon()
    }, []
    )
    if (!isLoaded) {
        return ''
    }
    return (<Game pokemon={pokemon}/>);
}


const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
