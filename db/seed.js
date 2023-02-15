const client = require('./index.js')
const { dropTables, createTables} = require('./initdb')


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

