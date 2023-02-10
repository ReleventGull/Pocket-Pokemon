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


module.exports = {
    createPokemon,
    getAllPokemon,
    getStarters
}