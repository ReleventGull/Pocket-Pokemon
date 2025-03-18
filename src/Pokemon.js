import { useEffect, useState} from "react"
import {fetchUserParty} from './apiCalls/userPokemon'
import PokemonPartyItem from './PokemonPartyItem'
const Pokemon = ({token, setDisplay, setAllowMove, setView}) => {
    const [pokemon, setPokemon] = useState(null)

    const fetchPokemon = async() => {
        let pokemon = await fetchUserParty(token)
        console.log('Pokemon from fetch pokemon', pokemon)
        setPokemon(pokemon)
    }
    useEffect(() => {
        fetchPokemon()
    }, [])

    return (
        <div className="pokemonPage">
            <div className="pokemonBody">
                {!pokemon ? null: pokemon.map(po => 
                  < PokemonPartyItem po={po}/>
                    )}
            <div className="pokemonFooter">
                <button className="footerCloseButton" onClick={() => {
                    setAllowMove ? setAllowMove(true) : null
                    setDisplay ? setDisplay('') : null
                    setView ? setView('') : null
                }}>Back</button>
                <button className="footerPCButton">PC</button>
            </div>
            </div>
            
        </div>
    )
}

export default Pokemon