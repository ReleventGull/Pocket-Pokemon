import {Bag} from '../Exported'

const UseButton = () => {
    return (
        <button className='useEncounterButton'>Use</button>
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