const BASE_URL = 'http://localhost:4000/api'
export const fetchAllPokemon = async () => {
        try {
            const response = await fetch(`${BASE_URL}/pokemon`)
            const result = await response.json()
            return result
        }catch(error) {
            console.error("There was an error fetching pokemon", error)
            throw error
        }
}
export const uploadLevels = async ({name, levels}) => {
    try {
        const response = await fetch(`${BASE_URL}/levels`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            levels,
            name,
            })
        }).then(result => result.json())
    }catch(error) {
        console.error("There was an erroring uploading the levels", error)
        throw error
    }
}
export const uploadingPokemon = async ({name, type1, type2, base_experience, catch_rate, legendary, mythical, experience_rate, stats}) => {
    try {
        const response = await fetch(`${BASE_URL}/pokemon`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                name, 
                type1,
                type2, 
                base_experience,
                catch_rate,
                legendary,
                mythical,
                experience_rate,
                stats
            })
        }).then(result => result.json())
        return response

    }catch(error) {
        console.error("There was an error uploading the pokemon", error)
        throw error
    }
}
export const getAllLevels = async () => {
    try {
        const response = await fetch(`${BASE_URL}/levels`).then(result => 
            result.json())
        return response
    }catch(error) {
        console.error("There was an error getting all the levels", error)
        throw error
    }
}

export const fetchAllMoves = async () => {
    try {
    const response = await fetch(`${BASE_URL}/moves`)
    const result = response.json()
    return result
    }catch(error) {
        console.error("There was an error fetching all of the moves", error)
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
    console.error("There was an error fetching pokemon rates", error)
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
    return response
    }catch(error) {
        console.error("there was an error generating the starter in the src api", error)
        throw error
    }
  }

  export const fetchEncounteredPokemon = async(pokemon) => {
    try {
    const response = await fetch(`${BASE_URL}/encounter/encounterPokemon`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pokemon: pokemon
        })
    }).then(result => result.json())
    return response
    }catch(error) {
        console.error("There was an error catching the encounteredPokemon", error)
        throw error
    }
  }

