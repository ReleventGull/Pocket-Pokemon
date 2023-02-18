import React, { useEffect } from "react";
import { useState } from "react";
import {GameBoard, NameDisplay} from "./Exported";
import { fetchEncounteredPokemon } from "./apiCalls";
import { fetchUserPokemon } from "./apiCalls/users";


const Game = ({token, pokemon}) => {
  const [player, setPlayer] = useState([1, 3]);
  const [playerDirection, setPlayerDirection] = useState("left");
  const [encounter, setEncounter] = useState(false);
  const [pokemonEncountered, setPokemonEncounterd] = useState(null);
  const [playerPokemon, setplayerPokemon] = useState([])
  const [allowMove, setAllowMove] = useState(false)


  const getUserPokemon = async() => {
    let userPokemon = await fetchUserPokemon(token)
    setplayerPokemon(userPokemon)
    }
   
    useEffect(() => {
    if(token) {
       getUserPokemon()
    }
   }, [])
  
  const pokemonEncounter = async() => {
    const randomPokemon = pokemon[Math.floor(Math.random() * pokemon.length)];
    const pokemonFromApi = await fetchEncounteredPokemon(randomPokemon)
    setPokemonEncounterd(pokemonFromApi);
  };

  const encounterChance = () => {
    let d = Math.random();
    if(d > 0.8) {
       pokemonEncounter()
       if (pokemonEncounter) {
        setEncounter(true)
       }
      
    }
  };
  useEffect(() => {
    setAllowMove(true)
  }, [])
  useEffect(() => {
    const handler = function keyPress(e) {
      if (!allowMove) {
        return
      }
      if (encounter === false) {
        {
          if (e.keyCode === 83) {
            setPlayerDirection("down");
            encounterChance();
            setPlayer([player[0] + 1, player[1]]); // Going Down
            if (player[0] >= 19) {
              setPlayer([19, player[1]]);
            }
          } else if (e.keyCode === 87 ) {
            setPlayerDirection("up");
            encounterChance();
            setPlayer([player[0] - 1, player[1]]); // Up Key
            if (player[0] <= 0) {
              setPlayer([0, player[1]]);
            }
          } else if (e.keyCode === 65) {
            setPlayerDirection("left");
            encounterChance();
            setPlayer([player[0], player[1] - 1]); // Going Left
            if (player[1] <= 0) {
              setPlayer([player[0], 0]);
            }
          } else if (e.keyCode === 68) {
            setPlayerDirection("right");
            encounterChance();
            setPlayer([player[0], player[1] + 1]); // Going Right
            if (player[1] >= 19) {
              setPlayer([player[0], 19]);
            }
          }
        }
      }
    };
    document.title = `Player is at  ${player}`;
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  });

  return (
    <main>
      <header>
        <h1 className="gameName">Pokemon!</h1>
      </header>
      <>
        {
        playerPokemon ? 
        <GameBoard
        encounter={encounter}
        playerDirection={playerDirection}
        player={player}
        pokemonEncountered={pokemonEncountered}
        setEncounter={setEncounter}
        playerPokemon={playerPokemon} 
        setAllowMove={setAllowMove}
        />
        :
        <h3>Loading ...</h3>
  }
      </>
    </main>
  );
};


export default Game