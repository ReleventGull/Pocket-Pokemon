const express = require('express')
const playerRouter = express.Router()
const { generateHP, generateIvs, generateStats } = require('./statFunctions')
playerRouter.post('/selectStarter', async (req, res, next) => {
    try {
    const {pokemon} = req.body
    pokemon['current_exp'] = 0
    pokemon['current_level'] = 1
    generateIvs(pokemon)
    generateHP(pokemon)
    generateStats(pokemon)
    pokemon['current_hp'] = pokemon.current_stats[0].hp
    res.send(pokemon)
    }catch(error) {
        console.error("there was an error generating the start for the player", )
    }
})

module.exports = playerRouter