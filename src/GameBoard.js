import React, { useState} from "react";
import {Settings} from './Exported'
import Encounter from './Encounter'
const GameBoard = ({
  player,
  playerDirection,
  encounter,
  pokemonEncountered,
  setEncounter,
  playerPokemon,
  setAllowMove,
  setPokemonEncounterd
}) => {
  const [rows, setRows] = useState(Array(20).fill("1"));
  const [columns, setColumns] = useState(Array(20).fill("1"));
  const [display, setDisplay] = useState('')
  
  return (
  encounter ? 
  <Encounter setPokemonEncounterd={setPokemonEncounterd} encounter={encounter} pokemonEncountered={pokemonEncountered} setEncounter={setEncounter} playerPokemon={playerPokemon}/>
  :
  <>
  {display == 'settings' ? 
  
  <Settings setAllowMove={setAllowMove} setDisplay={setDisplay}/>
  :
  <>
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
    <div className="settingsBox">
      <button>Pokemon</button>
      <button>Pokedex</button>
      <button>Settings</button>
      <button onClick={() => {
      setAllowMove(false),
      setDisplay('settings')
      }}
      >Settings</button>
  </div>
  </>
  }
  </>
  )
}

export default GameBoard;
