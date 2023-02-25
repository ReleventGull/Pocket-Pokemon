import React, { useEffect, useState } from "react";
import { fetchPokemonMovesById } from "../apiCalls/userPokemon";
import {attack} from '../apiCalls/battle'
const FightMoves = ({setMessage, setView, playerTurn, setPlayerTurn, playerPokemon, pokemonEncountered, setPokemonEncounterd, setEncounter}) => {
  const [pokemonMoves, setPokemonMoves] = useState([])
  
  const fetchPokemonMoves = async() => {
    let moves = await fetchPokemonMovesById(playerPokemon.id)
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
    if(resultOfAttack.pokemon.stats.hp.current_value < 0) {
      setEncounter(false)
    }
     setTimeout(() => {
      console.log("message!!")
      setView('message')
      setMessage(resultOfAttack.message)
    }, 10)
    setTimeout(() => {
      setPokemonEncounterd(resultOfAttack.pokemon)

    }, 2000)
    setTimeout(() => {
      setPlayerTurn(2)
    }, 3000)
  }

  return (
    pokemonMoves.length > 0 ?
    <>
    <div className="top three">
      
    {
     pokemonMoves.map(move => 
       <div key={move.id} onClick={() => handleMoveClick(move)} className="fightButton">
         <p>{move.name}</p>
         <p>power: {move.power}</p>
         <p>PP:{move.current_pp}/{move.pp}</p>
       </div>)
     }  
   </div>
 <button onClick={() => setView('')}className="fightBackButton">Back</button>
 </>
 :
 <h2>Bruh</h2>
 
  )
}
export default FightMoves