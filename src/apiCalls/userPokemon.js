const BASE_URL = "http://localhost:4000/api";

export const fetchPokemonMovesById = async(id) => {
    try {
        const response = await fetch(`${BASE_URL}/player/pokemon/${id}`)
        .then(result => result.json())
        return response
    }catch(error){
        console.error("There was an error fetching the pokemon moves by ID", error)
        throw error
    }
}