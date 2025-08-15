const {REACT_APP_BASE_URL = 'http://localhost:4000/api'} = process.env
export const uploadLevels = async ({name, levels}) => {
    try {
        const response = await fetch(`${REACT_APP_BASE_URL}/levels`, {
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
        const response = await fetch(`${REACT_APP_BASE_URL}/pokemon`, {
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
export const fetchMoves = async(id) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/move/${id}`)
        .then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an erroing fetching the pokemon moves", error)
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
  
  export const fetchItems = async(id) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/item/${id}`)
        .then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an erroring fetching the items from pokeapi", error)
        throw error
    }
}

  export const getAllLevels = async () => {
    try {
        const response = await fetch(`${REACT_APP_BASE_URL}/levels`).then(result => 
            result.json())
        return response
    }catch(error) {
        console.error("There was an error getting all the levels", error)
        throw error
    }
}

export const seedMoves = async({name, type, category, pp, power, accuracy, learnedBy}) => {
    try {
        const response = await fetch(`${REACT_APP_BASE_URL}/moves`, {
            method: "POST",
            headers :{
                'Content-Type': "application/json"
            },
             body: JSON.stringify({
            name: name,
            type: type,
            category: category,
            pp: pp,
            power: power,
            accuracy: accuracy,
            learnedBy: learnedBy
             })
        }).then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an error seeding the moves", error)
        throw error
    }
}

export const seedItems = async ({description, name, cost, category}) => {
    try {
        const response = await fetch(`${REACT_APP_BASE_URL}/shop`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description,
                name,
                cost,
                category
            })
        })
    }catch(error) {
        console.error("There was an error seeding the pokemon items", error)
        throw error
    }
}

export const checkSeeded = async() => {
    try {
        const response = await fetch(`${REACT_APP_BASE_URL}/seed/checkSeeded`).then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an an error checking the seeded", error)
        throw error
    }
    
}

export const createSeeded = async() => {
    try {
        const response = await fetch(`${REACT_APP_BASE_URL}/seed/createSeeded`).then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an an error checking the seeded", error)
        throw error
    }
    
}