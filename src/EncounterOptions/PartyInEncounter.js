import {Pokemon} from '../Exported'

const PartyInEncounter = ({token, setView}) => {
    return (
        <div className='partyEncounterBody'>
            <Pokemon setView={setView} token={token}/>
        </div>
        
    )
}
export default PartyInEncounter