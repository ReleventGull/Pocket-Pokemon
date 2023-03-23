const express = require('express')
const playerRouter = express.Router()
const { generateHP, generateIvs, generateStats } = require('./statFunctions')
const {getUserPokemon, getUserPokemonHp, getUserPokemonBySlot, getPokemonById} = require('../db/pokemon')
const {getPlayerPokemonMove} = require('../db/moves')
const { getUserPokemonLevel, getPokemonOnPlayer, healPokemon} = require('../db/stats')

playerRouter.post('/selectStarter', async (req, res, next) => {
    try {
    console.log("HI")
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
        let pokemonHp = await getPokemonOnPlayer(req.user.id)
        console.log(pokemonHp)
        for(let i = 0; i < pokemonHp.length; i++) {
            await healPokemon(pokemonHp[i].id)
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
playerRouter.post('/currentPokemon', async(req, res, next) => {
    try {
    const {slot, pokemonParticpating} = req.body
    let pokemon = await getUserPokemonBySlot({slot:slot, id: req.user.id})
    let level = await getUserPokemonLevel(pokemon.id)
    pokemon.level = level
    if (pokemon.stats.hp.current_value == 0) {
        delete pokemonParticpating[pokemon.id]
    res.send({pokemonParticpating:pokemonParticpating, pokemon: pokemon, message:`Your ${pokemon.name} has fainted!`})
    }else {
    res.send({pokemon: pokemon})
    }
    }catch(error) {
        console.error("There was an error getting the current pokemon", error)
        throw error
    }
})

playerRouter.get('/pokemon', async (req, res, next) => {
    try {
        const userPokemon = await getUserPokemon(req.user.id)
        userPokemon.sort((a, b) => a.slot - b.slot)
        for(let i = 0; i < userPokemon.length; i++) {
            if(userPokemon[i].stats.hp.current_value > 0) {
                const level = await getUserPokemonLevel(userPokemon[i].id)
                userPokemon[i].level = level
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

playerRouter.get('/party', async(req, res, next) => {
    try {
        let pokemon = await getUserPokemon(req.user.id)
        res.send(pokemon)
    }catch(error) {
        console.error("There was an error getting the player party in api/player", error)
        throw error
    }
})



module.exports = playerRouter