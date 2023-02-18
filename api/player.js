const express = require('express')
const playerRouter = express.Router()
const { generateHP, generateIvs, generateStats } = require('./statFunctions')
const {getUserPokemon} = require('../db/pokemon')
const {getPlayerPokemonMove} = require('../db/moves')

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
        console.error("there was an error generating the start for the player", error)
        throw error
    }
})

playerRouter.get('/pokemon/:pokemonId', async(req, res, next) => {
    try {
        const {pokemonId} = req.params
        const moves = await getPlayerPokemonMove(pokemonId)
        res.send(moves)
    }catch(error) {
        console.error("There was an error getting the pokemon move by it's ID", error)
        throw error
    }
})
playerRouter.get('/pokemon', async (req, res, next) => {
    try {
        const userPokemon = await getUserPokemon(req.user.id)
        res.send(userPokemon)
    }catch(error) {
        console.error("There was an error getting the player pokemon in the API", error)
        throw error
    }
})



module.exports = playerRouter