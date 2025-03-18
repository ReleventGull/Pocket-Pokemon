import React, { useEffect } from "react";
import { useState, useRef } from "react";
import {GameBoard, NameDisplay} from "./Exported";
import { fetchEncounteredPokemon } from "./apiCalls";
import {fetchCurrentAlivePokemon} from './apiCalls/users'


const Game = ({token, pokemon}) => {
  const [player, setPlayer] = useState([1, 3]);
  const [playerDirection, setPlayerDirection] = useState("left");
  const [encounter, setEncounter] = useState(false);
  const [pokemonEncountered, setPokemonEncounterd] = useState(null);
  const [allowMove, setAllowMove] = useState(false)
  const isMovingRef = useRef(false);
  const playerState = useRef([1,3])
  let intervalId = useRef(null)
  
  const pokemonEncounter = async() => {
    const randomPokemon = pokemon[Math.floor(Math.random() * pokemon.length)];
    const pokemonFromApi = await fetchEncounteredPokemon(randomPokemon, token)
    setPokemonEncounterd(pokemonFromApi);
  };
  const checkForAlivePokemonInParty = async() => {
    const result = await fetchCurrentAlivePokemon(token)
    if(result.message) {
      return false
    }
    return true
  }

  const encounterChance = async() => {
    let d = Math.random();

    if(d > 0.8) {
      const checkAlivePokemon = await checkForAlivePokemonInParty()
      if (checkAlivePokemon) {
        pokemonEncounter()
        setEncounter(true)
        isMovingRef.current = false
      }
    }
  };

  useEffect(() => {
    setAllowMove(true)
  }, [])

 

 

  const handler = function keyPress(e) {
    if (!allowMove) {
      return
    }
    if (encounter === false) {
        if(isMovingRef.current){
          return
        }else {
          isMovingRef.current = true
          if (e.keyCode === 83) {
            setPlayerDirection("down");
             intervalId.current = setInterval(() => {
                  if(!isMovingRef.current) {
                    return
                  }
                  encounterChance();
                  playerState.current = [playerState.current[0] + 1, playerState.current[1]]; // Going Down
                  if (playerState.current[0] >= 19) {
                    playerState.current = [19, playerState.current[1]];
                  }
                  
                  setPlayer(playerState.current)
              }, 200);
        }
        if (e.keyCode === 87) {
          setPlayerDirection("up");
           intervalId.current = setInterval(() => {
                if(!isMovingRef.current) {
                  return
                }
                encounterChance();
                playerState.current = [playerState.current[0] - 1, playerState.current[1]]; // Going Down
                if (playerState.current[0] <= 0) {
                  playerState.current = [0, playerState.current[1]];
                }
                setPlayer(playerState.current)
            }, 200);
      };
      if (e.keyCode === 65) {
        setPlayerDirection("left");
         intervalId.current = setInterval(() => {
              if(!isMovingRef.current) {
                return
              }
              encounterChance();
              playerState.current = [playerState.current[0], playerState.current[1]  - 1]; // Going Down
              if (playerState.current[1] <= 0) {
                playerState.current = [playerState.current[0], 0];
              }
              setPlayer(playerState.current)
          }, 200);
        }
        if (e.keyCode === 68) {
          setPlayerDirection("right");
           intervalId.current = setInterval(() => {
                if(!isMovingRef.current) {
                  return
                }
                encounterChance();
                playerState.current = [playerState.current[0], playerState.current[1]  + 1]; // Going Down
                if (playerState.current[1] >= 19) {
                  playerState.current = [playerState.current[0], 19];
                }
                setPlayer(playerState.current)
            }, 200);
          }
      }
    }
  };

  const handlerkeyup = (e) => {
    if(e.keyCode === 83 && playerDirection == "down") {
      isMovingRef.current = false
      clearInterval(intervalId.current)
    }else if(e.keyCode === 87 && playerDirection == "up") {
      isMovingRef.current = false
      clearInterval(intervalId.current)
    }else if(e.keyCode === 65 && playerDirection == "left") {
      isMovingRef.current = false
      clearInterval(intervalId.current)
    }else if(e.keyCode === 68 && playerDirection == "right") {
      isMovingRef.current = false
      clearInterval(intervalId.current)
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handler);
    document.addEventListener("keyup", handlerkeyup);
    return () => document.removeEventListener("keydown", handler);
  });

   

  return (
    <main>
      <>
        {
        <GameBoard
        encounter={encounter}
        playerDirection={playerDirection}
        player={player}
        pokemonEncountered={pokemonEncountered}
        setEncounter={setEncounter}
        setAllowMove={setAllowMove}
        setPokemonEncounterd={setPokemonEncounterd}
        token={token}
        />
      
  }
      </>
    </main>
  );
};


export default Game