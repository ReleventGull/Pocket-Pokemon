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
    (encounter && !pokemonEncountered) ? "loading" : 
    <div id={encounter ? "grid-encoutner" : "grid"}>
      {encounter ? (
        <div className="encounter-container">
          <div className="top one">
            
            <img  className='pokemonE Encountered' src={pokemonEncountered.image} />
          
          </div>
          
          <div className="top two">
          {playerPokemon ? <img className='pokemonE forPlayer'src={playerPokemon[0].image}/>: 'loading'}
          <progress id='pokemonPlayerHealth' value={playerPokemon[0].health} max={playerPokemon[0].health}>  </progress>
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
