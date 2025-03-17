const BASE_URL = "http://localhost:4000/api"

export const attack = async({attackingPokemon, defendingPokemon, move}) => {
    try {
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
        console.error("There was an error attacking in the api in src/api/balls.js", error)
        throw error
    }
}

export const defend = async({attackingPokemon, defendingPokemon, move}) => {
    try {
        const response = await fetch(`${BASE_URL}/encounter/defend`, {
            method: "POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               attackingPokemon,
               defendingPokemon,
               move,
            })
        }).then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an error attacking in the api in src/api/balls.js", error)
        throw error
    }
}

export const selectEnemyPokemonMove = async(moves) => {
    try {
        const response = await fetch(`${BASE_URL}/encounter/selectMove`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                moves
            })
        }).then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an error fetching the player pokemon moves in src/api/balls.js", error)
        throw error
    }
}

export const checkForAlivePokemon = async(token) => {
    try {
        const response = await fetch(`${BASE_URL}/encounter/healthCheck`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an error checkingfor alive pokemon in src/api/balls.js", error)
        throw error
    }
}

export const expGain = async({token, pokemonParticipating, faintedPokemonLevel, faintedPokemonBaseExperience}) => {
    try {
       
        const response = await fetch(`${BASE_URL}/encounter/expGain`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                pokemonParticipating, 
                faintedPokemonBaseExperience,
                faintedPokemonLevel
            })
        }).then(result => result.json())
        return response
    }catch(error){
        console.error("There was an error calling exp gain in src/api/balls.js", error)
        throw error
    }
}

export const usePokeball = async({token, enemyPokemon, usedPokeball}) => {
    try {
        const response = await fetch(`${BASE_URL}/encounter/useball`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                enemyPokemon: enemyPokemon, 
                usedPokeball: usedPokeball
            })
        }).then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an error creating call usePokeball in src/api/balls.js")
    }
}