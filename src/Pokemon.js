import { useEffect, useState} from "react"
import {fetchUserParty} from './apiCalls/userPokemon'
import {PokemonStatCard, PokmoneStatCard} from './Exported'
import PokemonPartyItem from './PokemonPartyItem'

const Pokemon = ({SwitchButton, forceSwitch, switchPokemon, token, setDisplay, setAllowMove, setView}) => {
    const [pokemon, setPokemon] = useState(null)
    const [selectedPokemon, setSelectedPokemon] = useState(null)
    const fetchPokemon = async() => {
        let pokemon = await fetchUserParty(token)
        setPokemon(pokemon)
    }
    useEffect(() => {
        fetchPokemon()
    }, [])

    return (
        

        <div className="pokemonPage">
            {selectedPokemon ? 
            <PokemonStatCard setSelectedPokemon={setSelectedPokemon} selectedPokemon={selectedPokemon}/>
            :

            <div className="pokemonBody">
                {!pokemon ? null: pokemon.map(po => 
                  < PokemonPartyItem setSelectedPokemon={setSelectedPokemon} SwitchButton={SwitchButton} switchPokemon={switchPokemon} po={po}/>
                    )}
            <div className="pokemonFooter">
                <button className="footerCloseButton" onClick={() => {
                    setAllowMove ? setAllowMove(true) : null
                    setDisplay ? setDisplay('') : null
                    setView  && !forceSwitch ? setView('') : null
                }}>Back</button>
                <button className="footerPCButton">PC</button>
            </div>
            </div>
            }
        </div>
        

        
        
    )
}

export default Pokemon