import React, { useState, useEffect } from "react";
import {default as FightMoves} from './EncounterOptions/FightMoves'
import { default as FightOptions } from './EncounterOptions/FightOptions'
import {default as FightMessage} from './EncounterOptions/FightMessage'
import {enemyPokemonMove, defend, checkForAlivePokemon} from './apiCalls/battle'
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
  const [playerPokemon, setplayerPokemon] = useState(null)
  const [message, setMessage] = useState('')
  
  const [pokemonParticpating, setPokemonParticpating] = useState({})
  
  const checkForHp = async() => {
      let hpCheck = await checkForAlivePokemon(token)
      return hpCheck
  }

  const fetchCurrentUserPokemon = async() => {
     let pok = await fetchCurrentPokemon({pokemonParticpating:pokemonParticpating, token: token, slot: playerPokemon.slot})
     
     return pok
  }
  const getUserPokemon = async() => {
      let participateObject = {}
      let userPokemon = await fetchUserPokemon(token)
      userPokemon['isFainted'] = false
      participateObject[userPokemon.id] = userPokemon
      setPokemonParticpating(participateObject)
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
let userPokemon = await fetchCurrentUserPokemon()
if (userPokemon.pokemonParticpating) {
  setPokemonParticpating(userPokemon.pokemonParticpating)
  console.log('After death', userPokemon.pokemonParticpating)
}



setMessage(result.message)
setTimeout(async() => {
  setplayerPokemon(userPokemon.pokemon)
  if (userPokemon.message) {
    let checkHp = await checkForHp()
    console.log(checkHp)
    setTimeout(() => {
      setMessage('')
    }, 1000)
    setTimeout(() => {
      setMessage(userPokemon.message)
    }, 1500)
    if (checkHp.message) {
      setTimeout(() => {
        setMessage('')
        setTimeout(() => {
          setMessage(checkHp.message)
        }, 1000)
        setTimeout(() => {
          setEncounter(false)
        }, 4500)
      }, 5000)
    }
  }else {
    setTimeout(() => {
      setView('')
    }, 1000)
  }
}, 2000)
}

useEffect(() => {
  if (playerTurn == 1) {
    return
  }else {
    if (pokemonEncountered.stats.hp.current_value <= 0) {
      return
    }
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
        {view == 'fight' ? <FightMoves pokemonParticpating={pokemonParticpating} setMessage={setMessage} playerTurn={playerTurn} setPlayerTurn={setPlayerTurn} setEncounter={setEncounter} setPokemonEncounterd={setPokemonEncounterd} pokemonEncountered={pokemonEncountered} setView={setView} playerPokemon={playerPokemon}/>: null}
        {view == 'message' ? <FightMessage setView={setView} message={message}/>: null}


      </div>
    </div>
  :
  <h2>Loading</h2>
  )
};
export default Encounter;
