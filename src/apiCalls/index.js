export const fetchAllPokemon = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/pokemon')
            const result = await response.json()
            
            return result
        }catch(error) {
            console.log("There was an error fetching pokemon")
            throw error
        }
}

export const fetchAllMoves = async () => {
    try {
    const response = await fetch(`http://localhost:4000/api/moves`)
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

