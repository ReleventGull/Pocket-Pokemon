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
    console.log("There was an error generating the first pokemon");
    throw error;
  }
};
const generateMoves = async ({ name, damage, pokemonId, type }) => {
  console.log("Starting to generateMoves");
  try {
    const { rows } = await client.query(
      `
INSERT INTO pokemoves (name, damage, type)
VALUES($1, $2, $3)
RETURNING *;
`,
      [name, damage, type]
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
    const { rows: moves } = await client.query(`
      SELECT * FROM pokemoves;
      `);
    console.log("Moves here", moves);

    pokemon.forEach((p) => {
      const filterMoves = moves.filter(
        (move) => move.type == p.type1 || move.type == p.type2
      );
      console.log("Filterd Moves each iteration", filterMoves)
      if(filterMoves.length > 0) {
        p["moves"] = filterMoves;
      } else {
      }
      
      
    });
    console.log(pokemon);

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

module.exports = {
  client,
  generatePokemon,
  getAllPokemon,
  generateMoves,
  getPokemonById,
};
