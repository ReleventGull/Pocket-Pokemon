import React, { useEffect, useState } from "react";
import { fetchPokemonMovesById } from "../apiCalls/userPokemon";

const FightMoves = ({setView, playerPokemon}) => {
  const [pokemonMoves, setPokemonMoves] = useState([])
  
  const fetchPokemonMoves = async() => {
    console.log(playerPokemon[0].id)
    let moves = await fetchPokemonMovesById(playerPokemon[0].id)
    console.log(moves)
    setPokemonMoves(moves)
  }
  useEffect(() => {
    fetchPokemonMoves()
  }, [])
  return (
    pokemonMoves.length > 0 ?
    <>
    <div className="top three">
      
    {
     pokemonMoves.map(move => 
       <div className="fightButton">
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