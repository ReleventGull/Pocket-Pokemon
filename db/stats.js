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
const getPokemonOnPlayer = async(id) => {
    try {
        const {rows: pokemon} = await client.query(`
        SELECT id FROM playerPokemon
        WHERE
        user_id=$1 AND "onPlayer"=true
        `, [id])
        return pokemon
    }catch(error) {
        console.error("There was an error getting the player pokemon on player", error)
        throw error
    }
}
const healPokemon = async(id) => {
    try {
        const {rows: stats} = await client.query(`
        UPDATE playerPokemonStats
        SET "currentValue"=value
        WHERE player_pokemon_id=$1
        RETURNING *
        `, [id])
        console.log(stats)
    }catch(error) {
        console.error("There was an error healing the pokemon db/stats", error)
        throw error
    }
}

const getUserPokemonLevel = async(id) => {
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
        
        return level.level
    }catch(error) {
        console.error("There was an error getting the pokemon by its level in db/stats", error) 
        throw error
        }
    }

const getPokemonlevel = async({id, exp}) => {
    try {
        const {rows: [level]} = await client.query(`
        SELECT levels.experience_rate_id, levels.exp, levels.level, experience.name
        FROM levels
        JOIN experience ON experience.id = levels.experience_rate_id
        JOIN pokemon ON pokemon.experience_rate=levels.experience_rate_id
        WHERE levels.exp <= $1 AND pokemon.id = $2
        ORDER BY levels.exp desc
        LIMIT 1
        `,[exp, id])
        return level
    }catch(error) {
        console.error("There was an error getting the pokemon level in db/stats", error)
        error
    }
}

const getPokemonMaxExp = async(id) => {
    try {
    const {rows: [exp]} = await client.query(`
    SELECT levels.exp, levels.level
    FROM levels
    JOIN pokemon ON levels.experience_rate_id=pokemon.experience_rate
    WHERE pokemon.id=$1
    ORDER BY exp desc
    LIMIT 1
    `, [id])
    return exp
    }catch(error) {
        console.error("There was an error getting pokemon max hp in db/stats", error) 
        throw error
    }
}
const updateExp = async({exp, pokemonId}) => {
    try {
        const {rows: [pokemon]} = await client.query(`
        UPDATE playerPokemon
        SET exp = exp + $1
        WHERE id=$2
        RETURNING *
        `, [exp, pokemonId])
        return pokemon
    }catch(error) {
        console.error("There was an error updating the exp in db/stats", error)
    }
}

const getPokemonStats = async (id) => {
    try {
        const {rows: result} = await client.query(`
        SELECT name, value AS base_stat, effort
        FROM
        pokemonStats
        WHERE pokemon_id = $1
        `, [id])
        let object = {}
        for(let i = 0; i < result.length; i++) {
            object[result[i].name] = {base_stat: result[i].base_stat, effort: result[i].effort}
        }
        return object
    }catch(error) {
        console.error("There was an error getting pokemon stats in db/stats")
    }
}

const updatePlayerPokemonStats = async ({id, value}) => {
    try {
        const {result: stats} = await client.query(`
        UPDATE playerPokemonStats
        SET value=$1
        WHERE id=$2
        RETURNING *
        `, [value, id])
        return stats
    }catch(error) {
        console.error("There was an error updating player Pokemon Stats in db/stats", error)
        throw error
    }
}

module.exports = {
    createPokemonStats,
    updatePokemonHp,
    getUserPokemonLevel,
    updateExp,
    getPokemonlevel,
    getPokemonMaxExp,
    getPokemonStats,
    getUserPokemonLevel,
    updatePlayerPokemonStats,
    getPokemonOnPlayer,
    healPokemon
}