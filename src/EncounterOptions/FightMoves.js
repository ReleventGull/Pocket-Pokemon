import React, { useEffect, useState } from "react";
import { fetchPokemonMovesById } from "../apiCalls/userPokemon";
import {attack} from '../apiCalls/battle'
const FightMoves = ({setView, playerPokemon, pokemonEncountered, setPokemonEncounterd, setEncounter}) => {
  const [pokemonMoves, setPokemonMoves] = useState([])
  
  const fetchPokemonMoves = async() => {
    let moves = await fetchPokemonMovesById(playerPokemon[0].id)
    setPokemonMoves(moves)
  }
  useEffect(() => {
    fetchPokemonMoves()
  }, [])
  
  const handleMoveClick = async(move) => {
    let resultOfAttack = await attack({attackingPokemon: playerPokemon[0], defendingPokemon:pokemonEncountered, move:move})
    if(resultOfAttack.pokemon.stats.hp.current_value < 0) {
      setEncounter(false)
    }
    setPokemonEncounterd(resultOfAttack.pokemon)
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