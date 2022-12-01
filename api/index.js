const express = require('express')
const apiRouter = express.Router()
const pokeRouter = require('./pokemon')



apiRouter.use('/pokemon', pokeRouter)



module.exports = apiRouter




