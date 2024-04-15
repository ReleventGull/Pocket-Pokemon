import React, { useEffect, useState } from "react";
import { fetchPokemonMovesById } from "../apiCalls/userPokemon";
import {attack, expGain} from '../apiCalls/battle'

const FightMoves = ({token, pokemonParticpating, setMessage, setView, playerTurn, setPlayerTurn, playerPokemon, pokemonEncountered, setPokemonEncounterd, setEncounter}) => {
  const [pokemonMoves, setPokemonMoves] = useState([])
  
  const fetchPokemonMoves = async() => {
    let moves = await fetchPokemonMovesById(playerPokemon.id)
    console.log(moves)
    setPokemonMoves(moves)
  }
  
  useEffect(() => {
    fetchPokemonMoves()
   
  }, [])
  
  const handleMoveClick = async(move) => {
    if(playerTurn !== 1) {
      return
    }
    let resultOfAttack = await attack({attackingPokemon: playerPokemon, defendingPokemon:pokemonEncountered, move:move})
     setTimeout(() => {
      setView('message')
      setMessage(resultOfAttack.message)
    }, 10)
    setTimeout(() => {
      setPokemonEncounterd(resultOfAttack.pokemon)
      setMessage('')
    }, 2000)
    if(resultOfAttack.pokemon.stats.hp.current_value == 0) {
      
      let result = await expGain({token: token, pokemonParticipating: pokemonParticpating, faintedPokemonBaseExperience: pokemonEncountered.baseExperience, faintedPokemonLevel: pokemonEncountered.level})

      setTimeout(() => {
        setMessage('')
        setMessage(`The ${pokemonEncountered.name} fainted!`)
        setTimeout(() => {
          setMessage('')
         setTimeout(() => {
          setMessage(`You gained $${result.cash}!`)
          setTimeout(() => {
            setEncounter(false)
          }, 3000)
         }, 500)
        }, 2500)
      }, 3000)
      
    }else {
      setTimeout(() => {
        setMessage('')
        setPlayerTurn(2)
      }, 3000)
    }
  }

  return (
    pokemonMoves.length > 0 ?
    <>
    <div className="top three">
      
    {
     pokemonMoves.map(move => 
       <button key={move.id} onClick={() => handleMoveClick(move)} className={`button ${move.type}`}>
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