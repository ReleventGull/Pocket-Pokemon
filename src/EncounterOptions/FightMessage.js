import { useEffect, useState } from "react"

const FightMessage = ({message, setView}) => {
    const [mes, setMes] = useState('')
    const [currentL, setCurrentLetter] = useState(0)
    

useEffect(() => {
        if(!message) {
            setCurrentLetter(0)
            setMes('')
            return
        }
        if(currentL >= message.length) {
            return
        }
        setTimeout(() => {
        setMes((pre) => pre + message[currentL])
        setCurrentLetter((pre) => pre + 1)
        }, 30)
}, [message, mes])
    return (
        <div className="attackMessageBox">
        <h2 className="attackMessage">{mes}</h2>
        </div>
    )
}

export default FightMessage