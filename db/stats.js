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
    }catch(error) {
        console.error("There was an error updating the exp in db/pok", error)
    }
}



module.exports = {
    createPokemonStats,
    updatePokemonHp,
    getUserPokemonLevel,
    updateExp,
    getPokemonlevel,
    getPokemonMaxExp
}