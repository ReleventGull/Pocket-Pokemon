import React, { useEffect, useState } from "react";
import { fetchPokemonMovesById } from "../apiCalls/userPokemon";
import {attack, expGain} from '../apiCalls/battle'
import e from "cors";

const FightMoves = ({token, pokemonParticpating, setMessage, setView, playerTurn, setPlayerTurn, pokemonEncountered, setPokemonEncounterd, setEncounter}) => {
  const [pokemonMoves, setPokemonMoves] = useState([])
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const fetchPokemonMoves = async() => {
    let moves = await fetchPokemonMovesById(pokemonParticpating.id)
    setPokemonMoves(moves)
  }
  
  useEffect(() => {
    fetchPokemonMoves()
   
  }, [])
  
  const handleMoveClick = async(move) => {
    if(playerTurn !== 1) {
      return
    }
    let resultOfAttack = await attack({attackingPokemon: pokemonParticpating, defendingPokemon:pokemonEncountered, move:move})
      setView('message')
      setMessage('')
      setMessage(resultOfAttack.message)
      await delay(resultOfAttack.message.length * 50 + 1000)
      setPokemonEncounterd(resultOfAttack.pokemon)
      setMessage('')
    if(resultOfAttack.pokemon.stats.hp.current_value == 0) {
      let result = await expGain({token: token, faintedPokemonBaseExperience: pokemonEncountered.baseExperience, faintedPokemonLevel: pokemonEncountered.level})
      setMessage('')
      setMessage(`The ${pokemonEncountered.name} fainted!`)
      await delay(3000)
      setMessage('')
      await delay(500)
      setMessage(`You gained $${result.cash}!`)
      await delay(3000)
      setEncounter(false)
    }else {
      await delay(1000)
        setMessage('')
        setPlayerTurn(2)
    }
  }

  return (
    pokemonMoves.length > 0 ?
    <>
    <div className="top three">
      
    {
     pokemonMoves.map(move => 
       <button key={move.id} onClick={() => handleMoveClick(move)} className={`fightButton ${move.type}`}>
         <p>{move.name}</p>
         <p>power: {move.power}</p>
         <p>PP:{move.current_pp}/{move.pp}</p>
       </button>)
     }  
        <button onClick={() => setView('')}className="fightBackButton">Back</button>
   </div>

 </>
 
 :
 <h2>Bruh</h2>
 
  )
}
export default FightMoves