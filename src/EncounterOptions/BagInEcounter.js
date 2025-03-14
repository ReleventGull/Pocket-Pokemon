import {Bag} from '../Exported'

const UseButton = ({useItem}) => {
    return (
        <button onClick={() => useItem()} className='useEncounterButton'>Use</button>
    )
}
const BagInEncounter = ({token, setView}) => {
    return (
        <div className="bagEncounterBody">
            <Bag UseButton={UseButton} setView={setView} token={token}/>
            
        </div>
    )
}

export default BagInEncounter