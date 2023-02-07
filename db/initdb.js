const client = require('./index')

const dropTables = async () => {
    try {
      console.log("Starting to drop Tables");
      await client.query(`
          DROP TABLE IF EXISTS pokemonStats;
          DROP TABLE IF EXISTS pokemoves;
          DROP TABLE IF EXISTS pokemon;
          DROP TABLE IF EXISTS levels;
          DROP TABLE IF EXISTS experience;
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
          CREATE TABLE levels (
            id SERIAL PRIMARY KEY,
            exp INTEGER NOT NULL,
            level INTEGER NOT NULL,
            experience_rate_id INTEGER REFERENCES experience(id)
          );
          CREATE TABLE pokemoves (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            type VARCHAR(255),
            power INTEGER NOT NULL
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