const client = require('./index')


const generateMoves = async ({ name, type, power }) => {
  console.log("Starting to generateMoves");
  try {
    const { rows } = await client.query(
      `
INSERT INTO pokemoves (name, type, power)
VALUES($1, $2, $3)
RETURNING *;
`,
      [name, type, power]
    );
    console.log("Finished generating moves!");
    console.log("Moves Create", rows);
  } catch (error) {
    console.log("There was an error in gernerateMoves");
    throw error;
  }
};


const getAllmoves = async() => {
  try {
    const {rows: moves} = await client.query(`
    SELECT * FROM pokemoves;
    `)
    return moves
  }catch(error) {
    console.log("There was an error getting all of the moves")
    throw error
  }
}


module.exports = {
  generateMoves,
  getAllmoves
};
