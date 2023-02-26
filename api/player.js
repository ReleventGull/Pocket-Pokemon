const express = require('express')
const playerRouter = express.Router()
const { generateHP, generateIvs, generateStats } = require('./statFunctions')
const {getUserPokemon, getUserPokemonHp} = require('../db/pokemon')
const {getPlayerPokemonMove} = require('../db/moves')
const {updatePokemonHp} = require('../db/stats')

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
playerRouter.get('/heal', async (req, res, next) => {
    try {
        let pokemonHp = await getUserPokemonHp(req.user.id)
        console.log(pokemonHp)
        for(let i = 0; i < pokemonHp.length; i++) {
            await updatePokemonHp({hp:pokemonHp[i].value, id:pokemonHp[i].id})
        }
        res.send({message: "Incomplete"})
    }catch(error) {
        console.error("There was an error healing playing pokemon in /api", error)
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
        userPokemon.sort((a, b) => a.slot - b.slot)
        for(let i = 0; i < userPokemon.length; i++) {
            console.log(userPokemon[i])
            if(userPokemon[i].stats.hp.current_value > 0) {
                res.send(userPokemon[i])
                return
            }
        }
        res.send({message: "No Pokemon available"})
    }catch(error) {
        console.error("There was an error getting the player pokemon in the API", error)
        throw error
    }
})



module.exports = playerRouter