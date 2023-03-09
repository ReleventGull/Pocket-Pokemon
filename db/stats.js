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

const updatePokemonHp = async({hp, id}) => {
    try {
        const {rows: pokemon} = await client.query(`
        UPDATE playerPokemonStats
        SET "currentValue"=$1
        WHERE id=$2
        RETURNING *
        `, [hp, id])
        return pokemon
    }catch(error) {
        console.error("There was an error updating the pokemon HP", error)
        throw error
    }
}

const getPokemonLevel = async(id) => {
    try {
        const {rows: [level]} = await client.query(`
        SELECT levels.*, playerPokemon.exp AS playerPokemonExp
        FROM levels
        JOIN pokemon ON levels.experience_rate_id=pokemon.experience_rate
        JOIN playerPokemon ON playerPokemon.pokemon_id=pokemon.id
        WHERE levels.exp <= playerPokemon.exp AND playerPokemon.id=$1
        ORDER BY exp DESC
        LIMIT 1;
        `, [id])
        console.log(level)
        return level.level
    }catch(error) {
        console.error("There was an error getting the pokemon by its level in db/stats", error) 
        throw error
        }
    }





module.exports = {
    createPokemonStats,
    updatePokemonHp,
    getPokemonLevel
}