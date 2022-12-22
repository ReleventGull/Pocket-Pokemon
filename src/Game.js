import React, { useEffect } from "react";
import { useState } from "react";
import {GameBoard, NameDisplay} from "./Exported";



const Game = ({pokemon, pokemonMoves, starters}) => {
  const [playerDefined, setPlayerDefined] = useState (false)
  const [player, setPlayer] = useState([1, 3]);
  const [playerDirection, setPlayerDirection] = useState("left");
  const [encounter, setEncounter] = useState(false);
  const [pokemonEncountered, setPokemonEncounterd] = useState([]);
  const [playerPokemon, setplayerPokemon] = useState([])
  console.log('PLAYER POKEMON HERE', playerPokemon)





  const pokemonEncounter = () => {
    const randomPokemon= pokemon[Math.floor(Math.random() * pokemon.length)];
    console.log(randomPokemon)
    console.log('All moves here', pokemonMoves)
    const validMoves = pokemonMoves.filter(move =>
      move.type == randomPokemon.type1 ||
      move.type == randomPokemon.type2 || 
      move.type == "Normal"
   )
        console.log(validMoves)
    setPokemonEncounterd(randomPokemon);
    
    console.log(`set encountered to`, randomPokemon);

  };

  const encounterChance = () => {
    let d = Math.random();
    console.log(d);
    if(d > 0.8) {
       pokemonEncounter()
      
      setEncounter(true)
    }
  };
  useEffect(() => {
    const handler = function keyPress(e) {
      
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
      {playerDefined ? 
        <GameBoard
        encounter={encounter}
        playerDirection={playerDirection}
        player={player}
        pokemonEncountered={pokemonEncountered}
        setEncounter={setEncounter}
        playerPokemon={playerPokemon}
        />:
        <NameDisplay setPlayerDefined={setPlayerDefined} setplayerPokemon={setplayerPokemon} starters={starters}/>
  }


        
       
        
        
        
      </>
    </main>
  );
};


export default Game