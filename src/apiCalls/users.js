
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
        console.error("There was an error checking the user in src/apiCalls/users", error)
        throw error
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
        console.error("There was an error registering the user in src/apiCalls/users")
        throw error
    }
}

export const loginUser = async ({username, password}) => {
    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username, 
                password
            })
        }).then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an error login in the user in src/apiCalls/users", error)
        throw error
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
        console.error("There was an error fetching the use pokemon in src/apiCalls/users", error)
        throw error
    }
}

export const purchseItem = async ({itemId, quantity, token}) => {
    try {
        console.log( quantity)
       
        const response = await fetch(`${BASE_URL}/shop/purchase`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                itemId,
                quantity
            })
        }).then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an error purchasing an item in src/apiCalls/users", error)
        throw error
    }
}

export const fetchUserCash = async(token) => {
    try {
        const response = await fetch(`${BASE_URL}/users/cash`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an error fetching user cash in src/api/users")
    }
}
