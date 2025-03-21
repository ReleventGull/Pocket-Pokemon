const express = require('express')
const playerRouter = express.Router()
const { generateHP, generateIvs, generateStats } = require('./statFunctions')
const {getUserPokemon, getUserPokemonHp, getUserPokemonBySlot, getPokemonById, getCurrentPlayerPokemonHp} = require('../db/pokemon')
const {getPlayerPokemonMove} = require('../db/moves')
const { getUserPokemonLevel, getPokemonOnPlayer, healPokemon} = require('../db/stats')
const{getAllPlayerItems, getPlayerItemsByCategory} = require('../db/users')
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
    const {pokemonParticpating} = req.body

    let pokemon = await getUserPokemonBySlot({slot:pokemonParticpating.slot, id: req.user.id})
    let level = await getUserPokemonLevel(pokemon.id)
    pokemon.level = level
    let faint = pokemon.stats.hp.current_value <= 0 ? true : false;
    let message = pokemon.stats.hp.current_value <= 0 ? `Your ${pokemon.name} has fainted!` : ""
    res.send({pokemon:pokemon, message: message, faint: faint})
    
    }catch(error) {
        console.error("There was an error getting the current pokemon", error)
        throw error
    }
})
playerRouter.post('/choosePokemon', async(req, res, next) => {
    try {
    const {pokemonChosen} = req.body
    console.log("CHOSEN POKEMON", pokemonChosen)
    const checkHp = await getCurrentPlayerPokemonHp({playerPokemonId: pokemonChosen.id})
    if (!checkHp.currentValue) {
        res.send({sucess: false})
        return 
    }
    let pokemon = await getUserPokemonBySlot({slot:pokemonChosen.slot, id: req.user.id})
    let level = await getUserPokemonLevel(pokemon.id)
    pokemon.level = level
    res.send({success: true, pokemon:pokemon, message: `${pokemon.name}, I choose you!`})
    }catch(error) {
        console.error("There was an error getting the current pokemon", error)
        throw error
    }
})

playerRouter.get('/pokemon', async (req, res, next) => {
    //This ensures that the pokemon that gets sent out is in the users party AND has hp available
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
        res.send({message: "You have no pokemon left!"})
    }catch(error) {
        console.error("There was an error getting the player pokemon in the API", error)
        throw error
    }
})

playerRouter.get('/party', async(req, res, next) => {
    try {
        let pokemon = await getUserPokemon(req.user.id)
        console.log('user pokemon in the serveer', pokemon)
        for(let i = 0; i < pokemon.length; i++) {
            const level = await getUserPokemonLevel(pokemon[i].id)
            pokemon[i].level = level
        }
        res.send(pokemon)
    }catch(error) {
        console.error("There was an error getting the player party in api/player", error)
        throw error
    }
})

playerRouter.get('/items/:category', async(req, res, next) => {
    try {
    const {category} = req.params
    const items = await getPlayerItemsByCategory({userId: req.user.id, category: category}) 
    res.send(items)
    }catch(error) {
        console.error("There was an error getting the player items in api/player", error)
        throw error
    }
})

playerRouter.get('/items', async(req, res, next) => {
    try {
    const items = await getAllPlayerItems(req.user.id) 
    res.send(items)
    }catch(error) {
        console.error("There was an error getting the player items in api/player", error)
        throw error
    }
})



module.exports = playerRouter