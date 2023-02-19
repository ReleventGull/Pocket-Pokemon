const express = require('express')
const encounterRouter = express.Router()
const { generateHP, generateIvs, generateStats } = require('./statFunctions')
const {getPokemonTypes} = require('../db/pokemon')
const {damage, typeTable} = require('./battle')

encounterRouter.post('/attack' , async (req, res, next) => {
    try {
    let crit
    const {attackingPokemon, defendingPokemon, move} = req.body
    const attackingPokemonTypes = await getPokemonTypes(attackingPokemon.pokemon_id)
   
    const defendingPokemonTypes = await getPokemonTypes(defendingPokemon.pokemon_id)
  
    const critChance = Math.random()
    if (critChance > 0.89) {
        crit = 2
    }else {
        crit = 1
    } 
    const returnPokmon = damage({attackingTypes: attackingPokemonTypes, defendingTypes: defendingPokemonTypes, pokemonAttacking:attackingPokemon, pokemondefending:defendingPokemon, move:move, critical: crit})
    res.send({pokemon: returnPokmon})
    }catch(error) {
        console.error("There was an erroring posting to /attack in the backend API", error)
        throw error
    }
})

encounterRouter.post('/encounterPokemon', async (req, res, next) => {
    try {
    const {pokemon} = req.body
    const randomLevel = pokemon.levels[Math.floor((Math.random() * 99))]
  
    pokemon['level'] = randomLevel.level
    pokemon['exp'] = randomLevel.exp
    pokemon['isWild'] = true
    //Generate The Ivs Of the Pokemon
    generateIvs(pokemon)
    
    //Generate The Hp For The Pokemon
    generateHP(pokemon)
   
    //Generate The Stats of the Random Pokemon
    generateStats(pokemon)
    res.send(pokemon)
    }catch(error) {
        console.error("there was an error with encounter pokemon API", error)
        error
    }
})


module.exports = encounterRouter