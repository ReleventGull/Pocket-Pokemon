import React, { useState, useEffect } from "react";
import {default as FightMoves} from './EncounterOptions/FightMoves'
import { default as FightOptions } from './EncounterOptions/FightOptions'
import {default as FightMessage} from './EncounterOptions/FightMessage'
import {default as Bag} from './EncounterOptions/BagInEcounter'
import {selectEnemyPokemonMove, defend, checkForAlivePokemon} from './apiCalls/battle'
import { fetchUserPokemon } from "./apiCalls/users";
import {fetchCurrentPokemon} from './apiCalls/userPokemon'
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
  const [message, setMessage] = useState('')
  const [pokemonParticpating, setPokemonParticpating] = useState(null)

  const getUserPokemon = async() => {
      let userPokemon = await fetchUserPokemon(token) // fetches the currently alive Pokemon in the party. (Where "onPlayer" = true)
      userPokemon['isFainted'] = false
      setPokemonParticpating(userPokemon)
      if(userPokemon.message) { //If there are no available pokemon alive in the players party
          setEncounter(false)
          setAllowMove(true)
          return
      }
  }
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const fetchCurrentUserPokemon = async() => {
  let currentPokemon = await fetchCurrentPokemon({pokemonParticpating:pokemonParticpating, token: token})
  return currentPokemon
}

const attackPlayer = async() => {
  let move = await selectEnemyPokemonMove(pokemonEncountered.moves)
  if (move.power == null || move.category == 'status') return // prevents ai from using status moves
  let result = await defend({move: move, attackingPokemon: pokemonEncountered, defendingPokemon: pokemonParticpating})
  let userPokemon = await fetchCurrentUserPokemon()
  setView('message')
  setMessage(result.message)
  await delay(result.message.length * 50 + 1000)
  setMessage('')
  setView('')
  setPokemonParticpating(userPokemon.pokemon)
  if(userPokemon.message){ // This means that the current pokemon has fainted
     let checkForAlivePokemon = await fetchUserPokemon(token);
     if(checkForAlivePokemon.message) { //if there is a message, it means there are no more pokemon alive
       setView('message') 
       setMessage(checkForAlivePokemon.message)
       await delay(checkForAlivePokemon.message.length * 50 + 1000)
       setView('')
       setEncounter(false)
       setAllowMove(true)
     }else {
      console.log("Switch pokemon")
        //This will be the login for switch to a different pokemon!
      }
    }else {
      //This means the current pokemon has not fainted
      setPlayerTurn(1)
    }
  }

useEffect(() => {
  getUserPokemon()
}, [])

useEffect(() => {
  if (playerTurn == 1) {
    return
  }else {
    if (pokemonEncountered.stats.hp.current_value <= 0) {
      return
    }
    attackPlayer()
  }
}, [playerTurn])

  return (
    pokemonEncountered  && pokemonParticpating ?
    <div id="grid-encoutner">
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
          <div className={`pokemonE forPlayer ${pokemonParticpating.name}`} src={pokemonParticpating}/>
            <div id="pokemonPlayerHealthContainer">
              <div id="pokemonHealthName">
                <p>{pokemonParticpating.name}</p>
                <p>Lv.{pokemonParticpating.level}</p>
              </div>

              <div id="pokemonHp">
                <span>HP</span>
                <progress
                  id="pokemonPlayerHealth"
                  value={pokemonParticpating.stats.hp.current_value}
                  max={pokemonParticpating.stats.hp.value}
                ></progress>
              </div>
              <p>
                {pokemonParticpating.stats.hp.current_value}/
                {pokemonParticpating.stats.hp.value}
              </p>
            </div>
          </div>
 
          {view == '' ? <FightOptions setEncounter={setEncounter} setView={setView}/>: null}
        {view == 'fight' ? <FightMoves token={token}pokemonParticpating={pokemonParticpating} setMessage={setMessage} playerTurn={playerTurn} setPlayerTurn={setPlayerTurn} setEncounter={setEncounter} setPokemonEncounterd={setPokemonEncounterd} pokemonEncountered={pokemonEncountered} setView={setView} />: null}
        {view == 'message' ? <FightMessage setView={setView} message={message}/>: null}
        {view == 'bag' ? <Bag token={token} setView={setView}/>: null}
        </div>
      </div>
  :
  <h2>Loading</h2>
  )
};
export default Encounter;
