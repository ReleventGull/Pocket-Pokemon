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
    const {rows: response} = await client.query(`
    SELECT pokemon.id, pokemon.name, pokemon.type1, pokemon.type2, pokemon."catchRate", pokemon."isLegendary", pokemon."isMythical", pokemon."baseExperience", pokemon.experience_rate,
    experience.name
    FROM pokemon
    JOIN experience ON pokemon.experience_rate=experience.id
    `)
    const {rows: levels} = await client.query(`
    SELECT exp, level
    FROM levels
    WHERE experience_rate_id=$1
    `, [id])
    console.log('All the pokemon here', response)
    }catch(error) {
        console.error("There was an error getting all the pokemon", error)
        throw error
    }
}


module.exports = {
    createPokemon,
    getAllPokemon
}