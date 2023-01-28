import React from "react";

const FightMoves = ({setView, playerPokemon}) => {
  return (
    <>
    <div className="top three">
      
    {
     playerPokemon.moves.map(move => 
       <div className="fightButton">
         <p>{move.name}</p>
         <p>Power: {move.power}</p>
       </div>)
     }  
   </div>
 <button onClick={() => setView('')}className="fightBackButton">Back</button>
 </>
 
  )
}
export default FightMoves