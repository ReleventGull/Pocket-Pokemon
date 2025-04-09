import {Bag} from '../Exported'

const UseButton = ({useItem}) => {
    return (
        <button onClick={() => useItem()} className='useEncounterButton'>Use</button>
    )
}
const BagInEncounter = ({setPlayerTurn, setEncounter, setMessage, pokemonEncountered, token, setView, animateBall}) => {
    return (
        <div className="bagEncounterBody">
            <Bag  setPlayerTurn={setPlayerTurn} setEncounter={setEncounter} setMessage={setMessage} animateBall={animateBall} pokemonEncountered={pokemonEncountered} UseButton={UseButton} setView={setView} token={token}/>
            
        </div>
    )
}

export default BagInEncounter