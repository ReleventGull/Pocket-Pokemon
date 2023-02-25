import React, { useState, useEffect } from "react";
import wildbattle from "./audiofiles/wildbattle.mp3";
import {default as FightMoves} from './EncounterOptions/FightMoves'
import { default as FightOptions } from './EncounterOptions/FightOptions'
import {default as FightMessage} from './EncounterOptions/FightMessage'
import {enemyPokemonMove, defend} from './apiCalls/battle'
import { fetchUserPokemon } from "./apiCalls/users";
const Encounter = ({
  pokemonEncountered,
  setEncounter,
  setPokemonEncounterd,
  token,
  setAllowMove,
  encounter,
}) => {
  const [playerTurn, setPlayerTurn] = useState(1)
  const [view, setView] = useState('')
  const [playerPokemon, setplayerPokemon] = useState(null)
  const [message, setMessage] = useState('')

  const getUserPokemon = async() => {
      let userPokemon = await fetchUserPokemon(token)
      if(userPokemon.message) {
        setEncounter(false)
        setAllowMove(true)
        return
      }
      setplayerPokemon(userPokemon)
  }
    
    useEffect(() => {
         getUserPokemon()
     }, [])

const attackPlayer = async() => {
let move = await enemyPokemonMove(pokemonEncountered.moves)
if (move.power == null || move.category == 'status') return
let result = await defend({move: move, attackingPokemon: pokemonEncountered, defendingPokemon: playerPokemon})
setMessage(result.message)
setTimeout(() => {
  setView('message')
  getUserPokemon()
  setTimeout(() => {
    setView('')
  }, 1000)
}, 2000)


}

useEffect(() => {
  if (playerTurn == 1) {
    return
  }else {
    attackPlayer()
    setPlayerTurn(1)
  }
}, [playerTurn])
  return (
    pokemonEncountered  && playerPokemon ?
    <div id="grid-encoutner">
      <div className="encounter-container">
        <div className="backgroundBattle">
          
          <div className="top one">
          <div id="pokemonPlayerHealthContainer">
              <div id="pokemonHealthName">
                <p>{pokemonEncountered.name}</p>
                <p>{`Lv.${pokemonEncountered.level}`}</p>
              </div>

              <div id="pokemonHp">
                <span>HP</span>
                <progress
                  id="pokemonPlayerHealth"
                  value={pokemonEncountered.stats.hp.current_value}
                  max={pokemonEncountered.stats.hp.value}
                ></progress>
              </div>
              <p>
                {pokemonEncountered.stats.hp.current_value}/
                {pokemonEncountered.stats.hp.value}
              </p>
            </div>
            <p className={`pokemon Encountered ${pokemonEncountered.name}`} />
          </div>

          <div /***************** PLAYER STATS START *****************/className="top two">
          <div className={`pokemonE forPlayer ${playerPokemon.name}`} src={playerPokemon}/>
            <div id="pokemonPlayerHealthContainer">
              <div id="pokemonHealthName">
                <p>{playerPokemon.name}</p>
                <p>Lv.{playerPokemon.level}</p>
              </div>

              <div id="pokemonHp">
                <span>HP</span>
                <progress
                  id="pokemonPlayerHealth"
                  value={playerPokemon.stats.hp.current_value}
                  max={playerPokemon.stats.hp.value}
                ></progress>
              </div>
              <p>
                {playerPokemon.stats.hp.current_value}/
                {playerPokemon.stats.hp.value}
              </p>
            </div>
          </div>
 
          
        </div>
        {view == '' ? <FightOptions setEncounter={setEncounter} setView={setView}/>: null}
        {view == 'fight' ? <FightMoves setMessage={setMessage} playerTurn={playerTurn} setPlayerTurn={setPlayerTurn} setEncounter={setEncounter} setPokemonEncounterd={setPokemonEncounterd} pokemonEncountered={pokemonEncountered} setView={setView} playerPokemon={playerPokemon}/>: null}
        {view == 'message' ? <FightMessage setView={setView} message={message}/>: null}


      </div>
    </div>
  :
  <h2>Loading</h2>
  )
};
export default Encounter;
