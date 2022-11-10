import React, { useState } from "react"

const GameBoard = ({player, playerDirection}) => {
const [rows, setRows] = useState(Array(20).fill('1'))
const [columns, setColumns] = useState(Array(20).fill('1'))

    return (
    <table id="grid">
    {rows.map((eachRow, rowIndex) => <tr  className='row'>{columns.map((eachColumn, columnIndex) => <td className={player[0] == rowIndex && player[1] == columnIndex ?  playerDirection : "cell"}> </td>)}</tr>)}

    </table>
    )
}





export default GameBoard
