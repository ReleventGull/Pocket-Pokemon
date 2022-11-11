import React, { useState } from "react"

const GameBoard = ({player, playerDirection, encounter, pokemonEncountered}) => {
const [rows, setRows] = useState(Array(20).fill('1'))
const [columns, setColumns] = useState(Array(20).fill('1'))
if ( pokemonEncountered) {
   
}
    return (
        
    <div id={encounter ? "grid-encoutner" : "grid"}>
       
        {encounter ? 
        <>
         <div 
         className="top1">{pokemonEncountered ? pokemonEncountered[0].name: "Name not here"} 
         </div>
         
         <div 
         className="top2">Character
         </div>
        
        
         <div 
         className="top3">
         Moves</div>
         </>
        : <table>
        {rows.map((eachRow, rowIndex) => <tr  key={rowIndex} className='row'>{columns.map((eachColumn, columnIndex) => <td key={columnIndex} className={player[0] == rowIndex && player[1] == columnIndex ?  playerDirection : "cell"}> </td>)}</tr>)}
        </table>
        
    
    
    
    }
    
    </div>
    )
}





export default GameBoard
