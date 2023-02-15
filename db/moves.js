const client = require('./index')


const createMove = async({name, type, category, pp, power, accuracy, learnedBy}) => {
  try {
    console.log(power, "Name")
    const {rows: [move]} = await client.query(`
    INSERT INTO pokemoves (name, type, category, pp, power, accuracy, "learnedBy") 
    VALUES($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `, [name, type, category, pp, power, accuracy, learnedBy])
    console.log(move)
    return move
  }catch(error){
    console.error("There was an error creating the moves", error)
    throw error 
  }
}
const getMoveByPokemon = async(name) => {
  try {
    const {rows: moves} = await client.query(`
    SELECT * 
    FROM pokemoves
    WHERE "learnedBy"=$1;
    `, [name])
  return moves
  }catch(error) {
    console.error("There was an error getting the move by the pokemon name", error)
    throw error
  }
}

const createPlayerPokemonMove = async({move_id, pokemon_id, current_pp}) => {
  try {
    const {row: [move]} = await client.query(`
    INSERT INTO playerPokemonMoves (move_id, pokemon_id, current_pp)
    VALUES($1, )
    `)
  }catch(error){
    console.error("There was an error creating the player pokemon mvoe", error)
    throw error
  }
}

module.exports = {
  createMove,
  getMoveByPokemon
};
