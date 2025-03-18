import {Pokemon} from '../Exported'

const SwitchButton = ({po, switchPokemon}) => {

    return (
        <button onClick={() => switchPokemon({pokemon: po})} className='switchButton'>Switch</button>
    )
}
const PartyInEncounter = ({token, setView, switchPokemon}) => {
    return (
        <div className='partyEncounterBody'>
            <Pokemon SwitchButton={SwitchButton} switchPokemon={switchPokemon} setView={setView} token={token}/>
        </div>
        
    )
}
export default PartyInEncounter