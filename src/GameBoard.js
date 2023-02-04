import React, { useState, useEffect} from "react";

import Encounter from './Encounter'
const GameBoard = ({
  player,
  playerDirection,
  encounter,
  pokemonEncountered,
  setEncounter,
  playerPokemon
}) => {
  const [rows, setRows] = useState(Array(20).fill("1"));
  const [columns, setColumns] = useState(Array(20).fill("1"));
 
  return (
  encounter ? 
  <Encounter encounter={encounter} pokemonEncountered={pokemonEncountered} setEncounter={setEncounter} playerPokemon={playerPokemon}/>
  :
    <div id='grid'>
        <table>
          {rows.map((eachRow, rowIndex) => (
            <tr key={rowIndex} className="row">
              {columns.map((eachColumn, columnIndex) => (
                <td
                  key={columnIndex}
                  className={
                    `${player[0] == rowIndex && player[1] == columnIndex? `player ${playerDirection}`:''} cell`
                  }
                ></td>
              ))}
            </tr>
          ))}
        </table>
        </div>
  
    
  )
}

export default GameBoard;
