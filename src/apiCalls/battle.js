const BASE_URL = "http://localhost:4000/api"



export const attack = async({attackingPokemon, defendingPokemon, move}) => {
    try {
        console.log(attackingPokemon, defendingPokemon, move)
        const response = await fetch(`${BASE_URL}/encounter/attack`, {
            method: "POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               attackingPokemon,
               defendingPokemon,
               move
            })
        }).then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an error attacking in the api", error)
        throw error
    }
}