const express = require('express')
const apiRouter = express.Router()

const pokeRouter = require('./pokemon')
const movesRouter = require('./pokemonMoves')



apiRouter.use('/pokemon', pokeRouter)
apiRouter.use('/moves', movesRouter)



module.exports = apiRouter




