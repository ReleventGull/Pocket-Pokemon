const express = require('express')
const apiRouter = express.Router()

const pokeRouter = require('./pokemon')
const movesRouter = require('./pokemonMoves')
const encounterRouter = require('./encounter')
const playerRouter = require('./player')

apiRouter.use('/pokemon', pokeRouter)
apiRouter.use('/moves', movesRouter)
apiRouter.use('/encounter', encounterRouter)
apiRouter.use('/player', playerRouter)


module.exports = apiRouter




