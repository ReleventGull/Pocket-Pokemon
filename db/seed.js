const { client, generatePokemon, getAllPokemon, generateMoves } = require("./index");

const pokemonList = require('./PokemonData')
const moves = require('./moves')
//For testing the Pokemon Tables
const dropTables = async () => {
  try {
    console.log("Starting to drop Tables");
    await client.query(`
        DROP TABLE IF EXISTS pokemoves;
        DROP TABLE IF EXISTS pokemon;
        `);
    console.log("Dropped all tables");
  } catch (error) {
    console.log("There was an error dropping the tables");
    throw error;
  }
};

const createTables = async () => {
  try {
    console.log("Starting to create Tables");
    await client.query(`
      CREATE TABLE pokemon (
        id SERIAL PRIMARY KEY,
        name varchar(255) UNIQUE NOT NULL,
        type1 varchar(255) NOT NULL,
        type2 varchar(255)
        );
        CREATE TABLE pokemoves (
          id SERIAL PRIMARY KEY,
          name varchar(255) UNIQUE NOT NULL,
          type varchar(255),
          power INTEGER NOT NULL
        );
    `);
    console.log("Created all the Tables!");
  } catch (error) {
    console.log("There was an error creating the tables");
    throw error;
  }
};

const generateInitialPokemon = async () => {
  try {
    pokemonList.forEach(async (p) => {
      await generatePokemon({
        name: p.name,
        type1: p.type1,
        type2: p.type2,
      })
    })
   
    

    console.log("Finished creating the pokemon!");
  } catch (error) {
    console.log("There was an error creating the pokemon");
    throw error;
  }
};

const generateInitialMoves = async () => {
  moves.forEach(async(m) => {
    await generateMoves({
      name: m.name, 
      type: m.type,
      power: m.power
      })
  })
  
    
}



const rebuildDb = async () => {
  client.connect();
  await dropTables();
  await createTables();
  await generateInitialPokemon();
  await generateInitialMoves();
  await getAllPokemon();
  
};
rebuildDb();

