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
    console.log('Pokemon here', pokemon)
    const {rows: levels} = await client.query(`
    SELECT levels.*
    FROM levels
    `)
   let allPokemon = []
   let currentPokemonObject = {}
   for(let i = 0; i < pokemon.length; i++) {
    let currentPokemon = pokemon[i]
    currentPokemonObject = currentPokemon
    currentPokemonObject['levels'] = []
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
console.log(allPokemon[0])
    }catch(error) {
        console.error("There was an error getting all the pokemon", error)
        throw error
    }
}


module.exports = {
    createPokemon,
    getAllPokemon
}