const BASE_URL = 'http://localhost:4000/api'
export const fetchAllPokemon = async () => {
        try {
            const response = await fetch(`${BASE_URL}/pokemon`)
            const result = await response.json()
            
            return result
        }catch(error) {
            console.log("There was an error fetching pokemon")
            throw error
        }
}

export const fetchAllMoves = async () => {
    try {
    const response = await fetch(`${BASE_URL}/moves`)
    const result = response.json()
    return result
    }catch(error) {
        console.log("There was an error fetching all of")
        throw error
    }
}

export const fetchPokemonById = async(id) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const result = await response.json()
        return result
    }catch(error) {
        throw error
    }
  }

  export const fetchPokemonRates = async(id) => {
    try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    const result = await response.json()
    return result
    }catch(error) {
    console.log("There was an error fetching pokemon rates")
    throw error
    }
  }



  export const fetchPokemonLevels = async (id) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/growth-rate/${id}/`)
        const result = await response.json()
        return result
    }catch(error) {
        throw error
    }
  }

  export const generateStarter = async(pokemon) => {
    try {
    const response = await fetch (`${BASE_URL}/player/selectStarter`, {
        method: "POST",
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pokemon: pokemon
        })
    }).then(result => result.json())
    console.log("completed response", response)
    return response
    }catch(error) {
        console.error("there was an error generating the starter in the src api", error)
    }
  }

  export const fetchEncounteredPokemon = async(pokemon) => {
    try {
        console.log("did I get this far", pokemon)
    const response = await fetch(`${BASE_URL}/encounter/encounterPokemon`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pokemon: pokemon
        })
    }).then(result => result.json())
    console.log("Response here", response)
    return response
    }catch(error) {
        console.error("There was an error catching the encounteredPokemon", error)
        throw error
    }
  }

