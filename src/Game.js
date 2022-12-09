import React, { useEffect } from "react";
import { useState } from "react";
import { NameDisplay, GameBoard } from "./Exported";



const Game = ({pokemon}) => {
  const [player, setPlayer] = useState([1, 3]);
  const [playerPokemon, setplayerPokemon] = useState({name: 'Giratina',  })
  const [playerDirection, setPlayerDirection] = useState("left");
  const [playerDefined, setPlayerDefined] = useState(true);
  const [encounterMessage, setencounterMessage] = useState("");
  const [encounter, setEncounter] = useState(false);
  const [pokemonEncountered, setPokemonEncounterd] = useState(null);

const giratina = [{
  "id": 8,
  "name": "Giratina",
  "location": null,
  "type1": "Ghost",
  "type2": "Dragon",
  "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/487.png",
  "health": 200,
  "moves": [
      {
          "id": 2,
          "name": "Dragon Ball",
          "damage": 100,
          "type": "Dragon"
      }
  ]
}]

useEffect(() => {
  setplayerPokemon(giratina)
}, [])


  const pokemonEncounter = () => {
    const randomPokemon= pokemon[Math.floor(Math.random() * pokemon.length)];
    setPokemonEncounterd(randomPokemon); 
    console.log(`set encountered to`, randomPokemon);
  };

  const encounterChance = () => {
    let d = Math.random();
    console.log(d);
    if(d > 0.8) {
      pokemonEncounter()
      setencounterMessage('You found a pokemon!')
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
        <div>{encounterMessage}</div>

        <GameBoard
          encounter={encounter}
          playerDirection={playerDirection}
          player={player}
          pokemonEncountered={pokemonEncountered}
          setEncounter={setEncounter}
          playerPokemon={playerPokemon}
        />
      </>
    </main>
  );
};


export default Game