const fetchPokemonById = async(id) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const result = await response.json()
        console.log(result)
    }catch(error) {
        throw error
    }
  }

