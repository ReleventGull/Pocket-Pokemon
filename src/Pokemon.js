import { useEffect, useState} from "react"
import {fetchUserParty} from './apiCalls/userPokemon'
const Pokemon = ({token, setDisplay, setAllowMove}) => {
    const [pokemon, setPokemon] = useState(null)

    const fetchPokemon = async() => {
        let pokemon = await fetchUserParty(token)
        console.log(pokemon)
        setPokemon(pokemon)
    }
    useEffect(() => {
        fetchPokemon()
    }, [])

    return (
        <div className="pokemonPage">
            <div className="pokemonBody">
                {!pokemon ? null: pokemon.map(po => 
                  <div className="pokemonBox">
                    <div className="imageLevelBox">
                     <div className={`playerParty ${po.name}`} />
                    </div>
                    <div className="nameHealthBox">
                        <h3>{po.name}</h3>
                    
                        <div className="healthContainerParty">
                        <h3>HP</h3>
                        <progress
                        id="pokemonPlayerHealth"
                        value={po.stats.hp.current_value}
                        max={po.stats.hp.value}
                        ></progress>
                        <h3>{po.stats.hp.current_value}/{po.stats.hp.value}</h3>
                        </div>
                        
                    </div>
                    <div className="thirdBox">
                        <h3>Lv. {po.level}</h3>
                    </div>    
                  </div>  
                    )}
            
            </div>
            <div className="pokemonFooter">
                <button onClick={() => {
                    setAllowMove(true)
                    setDisplay('')
                }}>Back</button>
            </div>
        </div>
    )
}

export default Pokemon