import React, { useState } from "react";

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
    (encounter && !pokemonEncountered && playerPokemon[0]) ? "loading" : 
    <div id={encounter ? "grid-encoutner" : "grid"}>
    {encounter ? (
      <div className="encounter-container">
      <div className='backgroundBattle'>  
          <div className="top one">
         <p className={`pokemon Encountered ${pokemonEncountered.name}`} />  
        
          </div>
          
          <div className="top two">
          {playerPokemon[0] ? <div className={`pokemonE forPlayer ${playerPokemon[0].name}`}src={playerPokemon[0]}/>: 'loading'}
          
          <div id='pokemonPlayerHealthContainer'>
          <p>{playerPokemon[0].health}/{playerPokemon[0].health}</p>
          <progress id='pokemonPlayerHealth' value={playerPokemon[0].health} max={playerPokemon[0].health}>  </progress>
          </div>
          </div>
        </div> 
          <div className="top three">
            <button className='button one'>Bag</button>
            <button className='button two'>Fight</button>
            <button className='button three'>Pokemon</button>
            <button onClick={() => setEncounter(false) } className='button four'>Run</button>           
          </div>
          
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default GameBoard;
