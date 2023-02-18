const client = require('./index')


const createPokemonStats = async({name, value, effort, pokemon_id}) => {
    try {
        const {rows: [stat]} = await client.query(`
        INSERT INTO pokemonStats(name, value, effort, pokemon_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `, [name, value, effort, pokemon_id])
        return stat
    }catch(error) {
        console.error("There was an error creating the pokemon stats.", error)
        throw error
    }
}


module.exports = {
    createPokemonStats
}