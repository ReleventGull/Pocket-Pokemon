const BASE_URL = "http://localhost:4000/api";


export const checkUser = async({password, username, name}) => {
    try {
        const response = await fetch(`${BASE_URL}/users/registerCheck`, {
            method: "POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password, 
                username,
                 name
            })
        }).then(result => result.json())
        return response
    }catch(error) {

    }
}

export const registerUser = async({pokemonId, password, username, name}) => {
    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: "POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password, 
                username,
                name,
                pokemonId
            })
        }).then(result => result.json())
        return response
    }catch(error) {

    }
}

export const fetchUserPokemon = async(token) => {
    try {
        const response = await fetch(`${BASE_URL}/player/pokemon`, {
            method:"GET",
            headers : {
                'Authorization': `Bearer ${token}`
            }
        }).then(result => result.json())
        return response
    }catch(error){
        console.error("There was an error fetching the use pokemon", error)
        throw error
    }
}
