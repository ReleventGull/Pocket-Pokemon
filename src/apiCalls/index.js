const BASE_URL = "http://localhost:4000/api";
export const fetchAllPokemon = async () => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("There was an error fetching pokemon", error);
    throw error;
  }
};

export const fetchAllMoves = async () => {
  try {
    const response = await fetch(`${BASE_URL}/moves`);
    const result = response.json();
    return result;
  } catch (error) {
    console.error("There was an error fetching all of the moves", error);
    throw error;
  }
};
export const fetchStarters = async() => {
    try {
        console.log("I was called")
        const response = await fetch(`${BASE_URL}/pokemon/starters`)
        .then(result => result.json())
        return response
    }catch(error) {
        console.error("There was an error fetching the starters", error)
        error
    }
}

export const generateStarter = async (pokemon) => {
  try {
    const response = await fetch(`${BASE_URL}/player/selectStarter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pokemon: pokemon,
      }),
    }).then((result) => result.json());
    return response;
  } catch (error) {
    console.error(
      "there was an error generating the starter in the src api",
      error
    );
    throw error;
  }
};

export const fetchEncounteredPokemon = async (pokemon, token) => {
  try {
    const response = await fetch(`${BASE_URL}/encounter/encounterPokemon`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        pokemon: pokemon,
      }),
    }).then((result) => result.json());
    return response;
  } catch (error) {
    console.error("There was an error catching the encounteredPokemon", error);
    throw error;
  }
};

export const getAllItems = async() => {
  try {
    const response = await fetch(`${BASE_URL}/shop`)
    .then(result => result.json())
    return response
  }catch(error) {
    console.error("There was an error fetching all the pokemon moves", error)
    throw error
  }
}

export const fetchItemsByName = async(name) => {
  try {
    console.log("IM here")
    const response = await fetch(`${BASE_URL}/shop/${name}`)
    .then(result => result.json())
    console.log(response)
    return response
  }catch(error) {
    console.error("There was an error getting the items by name in src/apiCalls/index", error)
    error
  }
}