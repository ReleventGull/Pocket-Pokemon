const client = require('./index.js')
const {generateMoves } = require("./moves");
const { dropTables, createTables} = require('./initdb')
const moves = require('./moveObject')


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

  client.end()
};
rebuildDb()

