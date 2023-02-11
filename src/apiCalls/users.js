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
