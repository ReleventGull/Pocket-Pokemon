const client = require('./index')

const dropTables = async () => {
    try {
      console.log("Starting to drop Tables");
      await client.query(`
        DROP TABLE IF EXISTS playerItems;
          DROP TABLE IF EXISTS playerPokemonMoves;
          DROP TABLE IF EXISTS playerPokemonStats;
          DROP TABLE IF EXISTS playerPokemon;
          DROP TABLE IF EXISTS pokemonStats;
          DROP TABLE IF EXISTS pokemoves;
          DROP TABLE IF EXISTS pokemon;
          DROP TABLE IF EXISTS levels;
          DROP TABLE IF EXISTS experience;
          DROP TABLE IF EXISTS users;
          DROP TABLE IF EXISTS shopItems;
          DROP TABLE IF EXISTS "isSeeded"
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
          CREATE TABLE pokemoves (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            type VARCHAR(255) NOT NULL,
            category VARCHAR(255) NOT NULL,
            pp INTEGER NOT NULL,
            power INTEGER,
            accuracy INTEGER,
            "learnedBy" VARCHAR(255) NOT NULL
           );
          CREATE TABLE experience (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL
           );
          CREATE TABLE pokemon (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            type1 VARCHAR(255) NOT NULL,
            type2 VARCHAR(255) DEFAULT null,
            "catchRate" INTEGER NOT NULL,
            "isLegendary" BOOLEAN default false,
            "isMythical" BOOLEAN default false,
            "baseExperience" INTEGER NOT NULL,
            experience_rate INTEGER REFERENCES experience(id)
            );
          CREATE TABLE pokemonStats (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            value INTEGER NOT NULL,
            effort INTEGER NOT NULL,
            pokemon_id INTEGER REFERENCES pokemon
          );
          CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name VARCHAR (150) NOT NULL,
            username VARCHAR(150) UNIQUE NOT NULL,
            password VARCHAR(150) NOT NULL,
            cash INTEGER default 1000 NOT NULL
          );
          CREATE TABLE playerPokemon (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            exp INTEGER NOT NULL,
            pokemon_id INTEGER REFERENCES pokemon(id),
            user_id INTEGER REFERENCES users(id),
            slot INTEGER
          );
          CREATE TABLE playerPokemonStats (
            id SERIAL PRIMARY KEY,
            name VARCHAR(150),
            value INTEGER NOT NULL,
            "currentValue" INTEGER NOT NULL,
            effort INTEGER NOT NULL,
            individual INTEGER NOT NULL,
            player_pokemon_id INTEGER REFERENCES playerPokemon(id)
          );
          CREATE TABLE levels (
            id SERIAL PRIMARY KEY,
            exp INTEGER NOT NULL,
            level INTEGER NOT NULL,
            experience_rate_id INTEGER REFERENCES experience(id)
          );
          CREATE TABLE playerPokemonMoves (
            id SERIAL PRIMARY KEY,
            move_id INTEGER REFERENCES pokemoves(id),
            pokemon_id INTEGER REFERENCES playerPokemon(id),
            current_pp INTEGER NOT NULL
          );
          CREATE TABLE shopItems (
            id SERIAL PRIMARY KEY,
            cost INTEGER NOT NULL,
            name VARCHAR(255) UNIQUE NOT NULL,
            description VARCHAR(255) NOT NULL,
            category VARCHAR(255) NOT NULL
          );
          CREATE TABLE playerItems (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            item_id INTEGER REFERENCES shopItems(id),
            quantity INTEGER NOT NULL
          );
          CREATE TABLE "isSeeded" (
          id SERIAL PRIMARY KEY,
          "seedValue" BOOL NOT NULL DEFAULT FALSE
          );
      `);
      console.log("Created all the Tables!");
    } catch (error) {
      console.log("There was an error creating the tables");
      throw error;
    }
  };

  module.exports = {
    dropTables, 
    createTables
  }