const client = require('./index')

const createPokemon = async({name, type1, type2, catchRate, isLegendary, isMythical, baseExperience, experience_rate}) => {
    try {
        const {rows: [pokemon]} = await client.query(`
        INSERT INTO pokemon (name, type1, type2, "catchRate", "isLegendary", "isMythical", "baseExperience", experience_rate)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
        `, [name, type1, type2, catchRate, isLegendary, isMythical, baseExperience, experience_rate])
        return pokemon
    }catch(error) {
        console.error("There was an error creating the pokemon!", error)
        throw error
    }
}

const getAllPokemon = async () => {
    try {
    const {rows: pokemon} = await client.query(`
    SELECT pokemon.id, pokemon.name, pokemon.type1, pokemon.type2, pokemon."catchRate", pokemon."isLegendary", pokemon."isMythical", pokemon."baseExperience", pokemon.experience_rate, 
    experience.name AS experience_type
    FROM pokemon
    JOIN experience ON pokemon.experience_rate=experience.id
    `)
    const {rows: levels} = await client.query(`
    SELECT exp, level, experience_rate_id
    FROM levels
    `)
    const {rows: stats} = await client.query(`
    SELECT * 
    FROM pokemonStats
    `)
   let allPokemon = []
   let currentPokemonObject = {}
   for(let i = 0; i < pokemon.length; i++) {
    let currentPokemon = pokemon[i]
    currentPokemonObject = currentPokemon
    currentPokemonObject['levels'] = []
    currentPokemonObject['stats'] = {}
    for(let b = 0; b < stats.length; b++) {
        if (stats[b].pokemon_id == currentPokemon.id) {
            currentPokemonObject.stats[stats[b].name] = {value: stats[b].value, effort: stats[b].effort}
        }
    }
    for(let j = 0; j < levels.length; j++) {
        if (levels[j].experience_rate_id == currentPokemon.experience_rate) {
            currentPokemonObject.levels.push(levels[j])
        }
        if(j == levels.length - 1 ) {
            delete currentPokemonObject.experience_rate
            allPokemon.push(currentPokemonObject)
            currentPokemonObject = {}
        }
    }
}
 return allPokemon
    }catch(error) {
        console.error("There was an error getting all the pokemon", error)
        throw error
    }
}

const getStarters = async() => {
    try {
        const {rows: pokemon} = await client.query(`
        SELECT pokemon.id, pokemon.name 
        FROM pokemon
        WHERE pokemon.name=$1 OR pokemon.name=$2 OR pokemon.name=$3
        `, ['charmander', 'squirtle', 'bulbasaur'])
        return pokemon
    }catch(error) {
        console.error("There was an error fetching the starts", error)
        throw error
    }
}

const getPokemonById = async(id) => {
    try {
        const {rows: pokemon} = await client.query(`
        SELECT pokemon.id, pokemon.name, pokemon."baseExperience", pokemonStats.name AS "statName", pokemonStats.value, pokemonStats.effort
        FROM pokemon
        JOIN pokemonStats 
        ON pokemon.id=pokemonStats.pokemon_id
        WHERE pokemon.id = $1;
        `, [id])
        let pokeObject = {}
        for(let i = 0; i < pokemon.length; i++) {
            if (!pokeObject.id) {
                pokeObject.id = pokemon[i].id,
                pokeObject.name = pokemon[i].name
                pokeObject.baseExperience = pokemon[i].baseExperience
                pokeObject.stats = {}
            }
           
            pokeObject.stats[pokemon[i].statName] = {value: pokemon[i].value, effort: pokemon[i].effort}
        }
        return pokeObject
    }catch(error) {
        console.error("There was an error getting the pokemon by the id", error)
        throw error
    }
}
const createPlayerPokemon = async({name, onPlayer, exp, level, pokemon_id, user_id}) => {
    try {
        const {rows: [pokemon]} = await client.query(`
        INSERT INTO playerPokemon (name, "onPlayer", exp, level, pokemon_id, user_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `, [name, onPlayer, exp, level, pokemon_id, user_id])
        return pokemon
    }catch(error) {
        console.error("There was an error creating the player pokemon", error)
        throw error
    }
}
const createPlayerPokmonStats = async({name, value, currentValue, effort, individual, player_pokemon_id}) => {
    try {
        const {rows: stats} = await client.query(`
        INSERT INTO playerPokemonStats (name, value, "currentValue", effort, individual, player_pokemon_id)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `, [name, value, currentValue, effort, individual, player_pokemon_id])
        return stats
    }catch(error) {
        console.error("There was an error creating the player pokemon stats", error)
        throw error
    }
}

const getUserPokemon = async(id) => {
    try {
        const {rows: pokemon} = await client.query(`
        SELECT playerPokemon.*, playerPokemonStats.id AS "statId", playerPokemonStats.name AS "statName", playerPokemonStats.value, playerPokemonStats."currentValue", playerPokemonStats.effort, playerPokemonStats.individual
        FROM playerPokemon
        JOIN playerPokemonStats ON playerPokemon.id=playerPokemonStats.player_pokemon_id
        WHERE playerPokemon.user_id=$1
        `, [id])
        let pokemonArray = []
        let currentPokeObject = {}
        console.log('Length right here', pokemon.length)
        for(let i = 0; i < pokemon.length; i++) {
       
            if(!currentPokeObject.name) {
                currentPokeObject.id = pokemon[i].id,
                currentPokeObject.name = pokemon[i].name 
                currentPokeObject.exp = pokemon[i].exp,
                currentPokeObject.level = pokemon[i].level,
                currentPokeObject.onPlayer = pokemon[i].onPlayer,
                currentPokeObject.stats = {}
            }
            currentPokeObject.stats[pokemon[i].statName] = {id: pokemon[i].statId, value: pokemon[i].value, current_value: pokemon[i].currentValue}
            console.log('Current Object', currentPokeObject)
            if (i == pokemon.length - 1 || currentPokeObject !== pokemon[i].id) {
                pokemonArray.push(currentPokeObject)
                currentPokeObject = {}
            }
        }
        return pokemonArray
    }catch(error){
        console.error("There was an error getting the user pokemon", error)
        throw error
    }
}


module.exports = {
    createPokemon,
    getAllPokemon,
    getStarters,
    getPokemonById,
    createPlayerPokemon,
    createPlayerPokmonStats,
    getUserPokemon
}