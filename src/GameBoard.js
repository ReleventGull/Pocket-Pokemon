import React, { useState} from "react";
import {Settings, Shop, Pokemon} from './Exported'
import Encounter from './Encounter'
const GameBoard = ({
  player,
  playerDirection,
  encounter,
  pokemonEncountered,
  setEncounter,
  playerPokemon,
  setAllowMove,
  setPokemonEncounterd,
  token
}) => {
  const [rows, setRows] = useState(Array(20).fill("1"));
  const [columns, setColumns] = useState(Array(20).fill("1"));
  const [display, setDisplay] = useState('')
  
  return (
  encounter ? 
  <Encounter setAllowMove={setAllowMove} token={token} setPokemonEncounterd={setPokemonEncounterd} encounter={encounter} pokemonEncountered={pokemonEncountered} setEncounter={setEncounter} playerPokemon={playerPokemon}/>
  :
  <>
  {display == 'settings' ? 
  <Settings setAllowMove={setAllowMove} setDisplay={setDisplay}/>
  : 
  display == 'shop' ?
  <Shop token={token} setAllowMove={setAllowMove} setDisplay={setDisplay}/>
  :
  display == 'Pokemon' ?
  <Pokemon setDisplay={setDisplay} setAllowMove={setAllowMove} token={token} />
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
      <button onClick={() => {
        setDisplay("Pokemon"),
        setAllowMove(false)
      }}>Pokemon</button>
      <button>Bag</button>
      <button onClick={() => {
        setDisplay('shop'),
        setAllowMove(false)
      }}
      > Shop</button>
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
