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
                  <div>
                    
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