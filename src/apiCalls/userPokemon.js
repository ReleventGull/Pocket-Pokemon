

const {REACT_APP_BASE_URL = "http://localhost:4000/api"} = process.env

export const fetchPokemonMovesById = async(id) => {
    try {
        const response = await fetch(`${REACT_APP_BASE_URL}/player/pokemon/${id}`)
        .then(result => result.json())
        return response
    }catch(error){
        console.error("There was an error fetching the pokemon moves by ID", error)
        throw error
    }
}

export const healPokemon = async(token) => {
    try {
        const response = await fetch(`${REACT_APP_BASE_URL}/player/heal`, {
            method: "GET",
            headers :{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    }catch(error) {
        console.error("There was an error healing the pokemon", error)
        throw error
    }
}


export const fetchCurrentPokemon = async({token, pokemonParticpating}) => {
    try {
        const response = await fetch(`${REACT_APP_BASE_URL}/player/currentPokemon`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                pokemonParticpating
            })   
        }).then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an error fetching the pokemon by the slot", error)
        throw error
    }
}

export const fetchUserParty = async(token) => {
    try {
        const response = await fetch(`${REACT_APP_BASE_URL}/player/party`, {
            method: "GET",
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        }).then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an error fetching the player party", error)
        throw error
    }
}

export const changePokemon = async({token, pokemonChosen}) => {
    try {
        const response = await fetch(`${REACT_APP_BASE_URL}/player/choosePokemon`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                pokemonChosen
            })   
        }).then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an error fetching the pokemon by the slot", error)
        throw error
    }
}