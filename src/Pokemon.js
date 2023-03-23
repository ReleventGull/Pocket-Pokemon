import { useEffect, useState} from "react"
import {fetchUserPokemon} from './apiCalls/users'
const Pokemon = ({token, setDisplay, setAllowMove}) => {
    const [pokemon, setPokemon] = useState(null)

    const fetchPokemon = async() => {
        let pokemon = await fetchUserPokemon(token)
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