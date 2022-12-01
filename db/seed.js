const { client, generatePokemon, getAllPokemon, generateMoves } = require("./index");

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
        location varchar(255),
        type1 varchar(255) NOT NULL,
        type2 varchar(255),
        image varchar(255) UNIQUE NOT NULL
        );
        CREATE TABLE pokemoves (
          id SERIAL PRIMARY KEY,
          name varchar(255) UNIQUE NOT NULL,
          damage INTEGER NOT NULL,
          type varchar(255)
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
    await generatePokemon({
      name: "Bulbasar",
      type1: "Grass",
      type2: "Poison",
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
    });
    await generatePokemon({
      name: "Pikachu",
      type1: "Electric",
      type2: "mouse",
      image:
        "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png",
    });
    await generatePokemon({
      name: "Charmander",
      type1: "Fire",
      type2: "Fire",
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
    });
    await generatePokemon({
      name: "Squirtle",
      type1: "Water",
      type2: "Water",
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
    });
    await generatePokemon({
      name: "Charmeleon",
      type1: "Fire",
      type2: "Fire",
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png",
    });
    await generatePokemon({
      name: "Wartortle",
      type1: "Turtle",
      type2: "Water",
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/008.png",
    });
    await generatePokemon({
      name: "Ivysaur",
      type1: "Grass",
      type2: "Poison",
      image:
        "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/002.png",
    });
    await generatePokemon({
      name: "Giratina",
      type1: "Ghost",
      type2: "Dragon",
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/487.png",
    });

    console.log("Finished creating the pokemon!");
  } catch (error) {
    console.log("There was an error creating the pokemon");
    throw error;
  }
};

const generateInitialMoves = async () => {
  await generateMoves({
    name: 'Scratch', 
    damage: 10,
    type: 'Normal'
    })
    await generateMoves({
      name: 'Dragon Ball', 
      damage: 100,
      type: 'Dragon'
    })
    await generateMoves({
      name: 'Fireball', 
      damage: 60,
      type: 'Fire'
    })
    await generateMoves({
      name: 'WaterBlast', 
      damage: 60,
      type: 'Water'
    })
    await generateMoves({
      name: 'Thundershock', 
      damage: 60,
      type: 'Electric'
    })
    await generateMoves({
      name: 'Leaf Blast', 
      damage: 60,
      type: 'Grass'
    })
    await generateMoves({
      name: 'Ember', 
      damage: 60,
      type: 'Fire'
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

