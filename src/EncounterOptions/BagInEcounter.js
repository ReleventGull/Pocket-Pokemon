import {Bag} from '../Exported'

const UseButton = ({useItem}) => {
    return (
        <button onClick={() => useItem()} className='useEncounterButton'>Use</button>
    )
}
const BagInEncounter = ({pokemonEncountered, token, setView}) => {
    return (
        <div className="bagEncounterBody">
            <Bag pokemonEncountered={pokemonEncountered} UseButton={UseButton} setView={setView} token={token}/>
            
        </div>
    )
}

export default BagInEncounter