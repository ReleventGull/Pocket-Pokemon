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
    SELECT pokemon.id AS pokemon_id, pokemon.name, pokemon.type1, pokemon.type2, pokemon."catchRate", pokemon."isLegendary", pokemon."isMythical", pokemon."baseExperience", pokemon.experience_rate, 
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
        if (stats[b].pokemon_id == currentPokemon.pokemon_id) {
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
const createPlayerPokemon = async({name, exp, pokemon_id, user_id, slot}) => {
    try {
        const {rows: [pokemon]} = await client.query(`
        INSERT INTO playerPokemon (name, exp, pokemon_id, user_id, slot)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `, [name, exp, pokemon_id, user_id, slot])
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
        SELECT playerPokemon.*, playerPokemon.slot, playerPokemonStats.id AS "statId", playerPokemonStats.name AS "statName", playerPokemonStats.value, playerPokemonStats."currentValue", playerPokemonStats.effort, playerPokemonStats.individual
        FROM playerPokemon
        JOIN playerPokemonStats ON playerPokemon.id=playerPokemonStats.player_pokemon_id
        WHERE playerPokemon.user_id=$1 AND playerPokemon.slot IS NOT NULL;
        `, [id])
        pokemon.sort((a, b) => a.id - b.id)
        let pokemonArray = []
        let currentPokeObject = {}
        for(let i = 0; i < pokemon.length; i++) {
       
            if(!currentPokeObject.name) {
                currentPokeObject.id = pokemon[i].id,
                currentPokeObject.pokemon_id = pokemon[i].pokemon_id
                currentPokeObject.name = pokemon[i].name 
                currentPokeObject.exp = pokemon[i].exp,
                currentPokeObject.level = pokemon[i].level,
                currentPokeObject.slot = pokemon[i].slot
                currentPokeObject.stats = {}
            }
            currentPokeObject.stats[pokemon[i].statName] = {id: pokemon[i].statId, value: pokemon[i].value, current_value: pokemon[i].currentValue}
            if (i == pokemon.length - 1 || currentPokeObject.id !== pokemon[i + 1].id) {
                pokemonArray.push(currentPokeObject)
                currentPokeObject = {}
            }
        }
        console.log('Pokemon array after completion', pokemonArray)
        return pokemonArray
    }catch(error){
        console.error("There was an error getting the user pokemon", error)
        throw error
    }
}
const getUserPokemonBySlot = async({slot, id}) => {
    try {
        const {rows: pokemon} = await client.query(` 
        SELECT playerPokemon.*, playerPokemonStats.id AS "statId", playerPokemonStats.name AS "statName", playerPokemonStats.value, playerPokemonStats."currentValue", playerPokemonStats.effort, playerPokemonStats.individual
        FROM playerPokemon
        JOIN playerPokemonStats ON playerPokemon.id=playerPokemonStats.player_pokemon_id
        WHERE playerPokemon.slot=$1 AND playerPokemon.user_id=$2
        `, [slot, id])
        let currentPokeObject = {}
        for(let i = 0; i < pokemon.length; i++) {
            if(!currentPokeObject.name) {
                currentPokeObject.id = pokemon[i].id,
                currentPokeObject.pokemon_id = pokemon[i].pokemon_id
                currentPokeObject.name = pokemon[i].name 
                currentPokeObject.exp = pokemon[i].exp,
                currentPokeObject.slot = pokemon[i].slot
                currentPokeObject.stats = {}
            }
            currentPokeObject.stats[pokemon[i].statName] = {id: pokemon[i].statId, value: pokemon[i].value, current_value: pokemon[i].currentValue, individual: pokemon[i].individual, effort: pokemon[i].effort}
        }
        return currentPokeObject
    }catch(error) {
        console.error("There was an error getting the pokemon by slots", error)
        throw error
    }
}

const getUserPokemonHp = async(id) => {
    try {
        const {rows: values} = await client.query(`
        SELECT playerPokemon.name, playerPokemonStats.name, playerPokemonStats.value, playerPokemonStats.id
        FROM playerPokemon
        JOIN playerPokemonStats
        ON playerPokemonStats.player_pokemon_id=playerPokemon.id
        WHERE playerPokemon.user_id=$1 AND playerPokemon.slot IS NOT NULL AND playerPokemonStats.name='hp';
        `, [id])
        return values
    }catch(error) {
        console.error("There was an error getting the userpokemon HP in /db", error)
        throw error
    }
}
const checkUserPokemonHp = async(id) => {
    try {
        const {rows: pokemon} = await client.query(`
        SELECT playerPokemon.id, playerPokemon.name, playerPokemonStats."currentValue", playerPokemon.slot
        FROM playerPokemon
        JOIN playerPokemonStats ON playerPokemonStats.player_pokemon_id=playerPokemon.id
        WHERE playerPokemon.user_id=$1 AND playerPokemonStats.name='hp' AND playerPokemonStats."currentValue">0 AND playerPokemon.slot IS NOT NULL;
        `, [id])
        return pokemon
    }catch(error) {
        console.error("There was an error checking the user pokemon hp", error)
        throw error
    }
}
const getPokemonTypes = async(id) => {
    try {
        const {rows: [types]} = await client.query(`
        SELECT pokemon.type1, pokemon.type2
        FROM pokemon
        WHERE id=$1
        `, [id])
        return types
    }catch(error) {
        console.error("There was an error getting the pokemon types", error)
        throw error
    }
}

const getUserPokemonExp = async(id) => {
    try {
        const {rows: exp} = await client.query(`
        SELECT exp FROM playerPokemon
        WHERE user_id=$1 AND slot IS NOT NULL;
        `, [id])
        return exp
    }catch(error) {
        console.error("There was an error getting pokemon exp in db/pokemon", error)
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
    getUserPokemon,
    getPokemonTypes,
    getUserPokemonBySlot,
    getUserPokemonHp,
    checkUserPokemonHp,
    getUserPokemonExp
}