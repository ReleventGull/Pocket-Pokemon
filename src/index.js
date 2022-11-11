import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import { NameDisplay, GameBoard } from "./Exported";
const { pokemonList } = require("./PokemonData");

const App = () => {
  const [player, setPlayer] = useState([1, 3]);
  const [playerDirection, setPlayerDirection] = useState("left");
  const [playerDefined, setPlayerDefined] = useState(true);
  const [encounterMessage, setencounterMessage] = useState("");
  const [encounter, setEncounter] = useState(false);
  const [pokemon, setPokemonList] = useState([]);
  const [pokemonEncountered, setPokemonEncounterd] = useState([]);



  useEffect(() => {
    setPokemonList(pokemonList);
  });


  const pokemonEncounter = () => {
    const randomPokemon= pokemon[Math.floor(Math.random() * pokemon.length)];
    setPokemonEncounterd([randomPokemon]); 
  };

  const encounterChance = () => {
    let d = Math.random();
    console.log(d);
    if (d < 0.5) {
      setencounterMessage("Keep Looking!");
    } else if (d > 0.5)
    pokemonEncounter(), setencounterMessage("You found a pokemon!"), setEncounter(true);
    else {
      setencounterMessage("Keep Looking!");
    }
  };
  useEffect(() => {
    const handler = function keyPress(e) {
      if (encounter === false) {
        {
          if (e.keyCode === 40) {
            setPlayerDirection("down");
            encounterChance();
            setPlayer([player[0] + 1, player[1]]); // Going Down
            if (player[0] >= 19) {
              setPlayer([19, player[1]]);
            }
          } else if (e.keyCode === 38) {
            setPlayerDirection("up");
            setPlayer([player[0] - 1, player[1]]); // Up Key
            if (player[0] <= 0) {
              setPlayer([0, player[1]]);
            }
          } else if (e.keyCode === 37) {
            setPlayerDirection("left");
            setPlayer([player[0], player[1] - 1]); // Going Left
            if (player[1] <= 0) {
              setPlayer([player[0], 0]);
            }
          } else if (e.keyCode === 39) {
            setPlayerDirection("right");
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
        />
      </>
    </main>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
