import {Bag} from '../Exported'


const BagInEncounter = ({token, setView}) => {
    return (
        <div className="bagEncounterBody">
            <Bag setView={setView} token={token}/>
        </div>
    )
}

export default BagInEncounter