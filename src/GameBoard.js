import React, { useState, useEffect} from "react";
import wildbattle from './audiofiles/wildbattle.mp3'
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
  
  let battleSong = new Audio(wildbattle)
 
  
  useEffect(() => {
    if (encounter == true) {
      console.log("Am I going")
      battleSong.currentTime = .4
      battleSong.play()
     
    }
  }, [encounter])

  return (
    (encounter && !pokemonEncountered && playerPokemon[0]) ? "loading" : 
    
    <div id={encounter ? "grid-encoutner" : "grid"}>
      <audio>
        <source src='https://www.youtube.com/watch?v=izQdybNFzUs' type="audio/mp3"></source>
      </audio>
    {encounter ? (
      <div className="encounter-container">
      <div className='backgroundBattle'>  
          <div className="top one">
         <p className={`pokemon Encountered ${pokemonEncountered.name}`} />  
        
          </div>
          
          <div className="top two">
          {playerPokemon[0] ? <div className={`pokemonE forPlayer ${playerPokemon[0].name}`}src={playerPokemon[0]}/>: 'loading'}
          
          <div id='pokemonPlayerHealthContainer'>
            
            <div id='pokemonHealthName'>
              <p>
              {playerPokemon[0].name}
              </p>
              <p>
              Lv.42
              </p>
            </div>
            
            <div id='pokemonHp'>
             <span>HP</span>
              <progress id='pokemonPlayerHealth' value={playerPokemon[0].health} max={playerPokemon[0].health}></progress>
            </div>
          <p>{playerPokemon[0].health}/{playerPokemon[0].health}</p>
          </div>
          
          </div>
        </div> 
          
      
          <div className="top three">
            <button className='button one'>Bag</button>
            <button className='button two'>Fight</button>
            <button className='button three'>Pokemon</button>
            <button onClick={() => {
            setEncounter(false),
             battleSong.pause(),
             battleSong.currentTime = 0
            }
            } className='button four'>Run</button>           
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
