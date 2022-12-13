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