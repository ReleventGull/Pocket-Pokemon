const express = require('express')
const apiRouter = express.Router()

const pokeRouter = require('./pokemon')
const movesRouter = require('./pokemonMoves')
const encounterRouter = require('./encounter')
const playerRouter = require('./player')
const levelRouter = require('./levels')

apiRouter.use('/pokemon', pokeRouter)
apiRouter.use('/moves', movesRouter)
apiRouter.use('/encounter', encounterRouter)
apiRouter.use('/player', playerRouter)
apiRouter.use('/levels', levelRouter)

module.exports = apiRouter




