import React, { useState, useEffect } from "react";
import {Pokeball, FightMoves, FightOptions, FightMessage, BagInEcounter, UserPokemonComponent, EnemyPokemonComponent, PartyInEncounter} from './EncounterOptions/FightExports'
import {selectEnemyPokemonMove, defend, checkForAlivePokemon} from './apiCalls/battle'
import { fetchCurrentAlivePokemon } from "./apiCalls/users";
import {fetchCurrentPokemon} from './apiCalls/userPokemon'
import {changePokemon} from './apiCalls/userPokemon'
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
  const [forceSwitch, setForceSwitch] = useState(false)
  const getUserPokemon = async() => {
      let userPokemon = await fetchCurrentAlivePokemon(token) // fetches the currently alive Pokemon in the party. (Where "onPlayer" = true)
      userPokemon['isFainted'] = false
      console.log('current pokemon', userPokemon)
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

const switchPokemon = async({pokemon}) => {
  let chosenPokemon = await changePokemon({pokemonChosen: pokemon, token:token}) 
  if(chosenPokemon.success) {
    if(forceSwitch) {
      setForceSwitch(false)
    }
    setPokemonParticpating(chosenPokemon.pokemon)
    setView('message')
    setMessage(chosenPokemon.message) 
    await delay(2500)
    setMessage('')
    setPlayerTurn(2)
  }
}

const attackPlayer = async() => {
  setPlayerTurn(1)
  let move = await selectEnemyPokemonMove(pokemonEncountered.moves)
  if (move.power == null || move.category == 'status') return // prevents ai from using status moves
  let result = await defend({move: move, attackingPokemon: pokemonEncountered, defendingPokemon: pokemonParticpating})
  let userPokemon = await fetchCurrentUserPokemon()
  setView('message')
  setMessage(result.message)
  await delay(result.message.length * 50 + 1000)
  setPokemonParticpating(userPokemon.pokemon)
  setMessage('')
  await delay(500)
  if(userPokemon.faint){ // This means that the current pokemon has fainted
     setMessage(userPokemon.message)
     await delay(3000)
     setMessage('')
     let checkForAlivePokemon = await fetchCurrentAlivePokemon(token);
     if(checkForAlivePokemon.message) { //if there is a message, it means there are no more pokemon alive
       setMessage(checkForAlivePokemon.message)
       await delay(checkForAlivePokemon.message.length * 50 + 1000)
       setEncounter(false)
       setAllowMove(true)
     }else {
        //If this hits, it means the user still has alive pokemon and needs to be forced to switch
        setForceSwitch(true)
        setView('party')
      }
    }else {
      //This means the current pokemon has not fainted
      setView('')
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
        {view == 'party' ? <PartyInEncounter forceSwitch={forceSwitch} switchPokemon={switchPokemon} token={token} setView={setView}/>: null}
        </div>
      </div>
  :
  <h2>Loading</h2>
  )
};
export default Encounter;
