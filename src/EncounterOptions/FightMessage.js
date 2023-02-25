import { useEffect, useState } from "react"

const FightMessage = ({message, setView}) => {
    const [mes, setMes] = useState('')
    const [currentL, setCurrentLetter] = useState(0)
  
useEffect(() => {
        if(currentL >= message.length) {
            setTimeout(() => {
            setView('')
            }, 2000)
       
            return
        }
        setTimeout(() => {
        setMes((pre) => pre + message[currentL])
        setCurrentLetter((pre) => pre + 1)
        }, 30)
    
}, [mes])
    

    return (
        <div className="attackMessageBox">
        <h2 className="attackMessage">{mes}</h2>
        </div>
    )
}

export default FightMessage