import React, { useState, useEffect } from "react";
import {Pokeball, FightMoves, FightOptions, FightMessage, BagInEcounter, UserPokemonComponent, EnemyPokemonComponent, PartyInEncounter} from './EncounterOptions/FightExports'
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
  const [isCatching, setIsCatch] = useState(false)
  const [pokeball, setPokeBall] = useState('')
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

const animateBall = async({success, shakes, pokeball}) => {
  setIsCatch(true)
  setPokeBall(pokeball)
  await delay(500)
  for(let i = 1; i <= shakes; i++) {
    setPokeBall(`${pokeball} animate`)
    await delay(1000)
    setPokeBall(pokeball)
    await delay(500)
    }
    if(!success) {
      setIsCatch(false)
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
            {isCatching ? <Pokeball pokeball={pokeball}/> : <EnemyPokemonComponent pokemonEncountered={pokemonEncountered}/>}
          </div>
          <div className="top two">
            {<UserPokemonComponent pokemonParticpating={pokemonParticpating}/>}
          </div>
        {view == '' ? <FightOptions setEncounter={setEncounter} setView={setView}/>: null}
        {view == 'fight' ? <FightMoves token={token}pokemonParticpating={pokemonParticpating} setMessage={setMessage} playerTurn={playerTurn} setPlayerTurn={setPlayerTurn} setEncounter={setEncounter} setPokemonEncounterd={setPokemonEncounterd} pokemonEncountered={pokemonEncountered} setView={setView} />: null}
        {view == 'message' ? <FightMessage setView={setView} message={message}/>: null}
        {view == 'bag' ? <BagInEcounter setEncounter={setEncounter} setMessage={setMessage} animateBall={animateBall} pokemonEncountered={pokemonEncountered} token={token} setView={setView}/>: null}
        {view == 'party' ? <PartyInEncounter token={token} setView={setView}/>: null}
        </div>
      </div>
  :
  <h2>Loading</h2>
  )
};
export default Encounter;
