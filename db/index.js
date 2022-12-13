const { Client } = require("pg");
//Imports PostGres Databse so we can make it.

const client = new Client("postgres://localhost:5432/pokemon");

const generatePokemon = async ({ name, type1, type2, image }) => {
  try {
    console.log("Starting to create pokemon");
    const { rows } = await client.query(
      `
        INSERT INTO pokemon ( name, type1, type2, image)
        VALUES($1, $2, $3, $4)
        RETURNING *;
        `,
      [name, type1, type2, image]
    );

    return rows;
  } catch (error) {
    console.log("There was an error generating pokemon");
    throw error;
  }
};
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
const getAllPokemon = async () => {
  try {
    const { rows: pokemon } = await client.query(`
      SELECT * FROM pokemon;
        `);
    return pokemon;
  } catch (error) {
    console.log("There was an error fetching all the pokemon.");
    throw error;
  }
};

const getPokemonById = async (pokeId) => {
  const {
    rows: [pokemon],
  } = await client.query(
    `
SELECT * FROM pokemon
WHERE id=$1
`,
    [pokeId]
  );
  return pokemon;
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
  client,
  generatePokemon,
  getAllPokemon,
  generateMoves,
  getPokemonById,
  getAllmoves
};
