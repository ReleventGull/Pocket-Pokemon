const express = require('express')
const encounterRouter = express.Router()
const { generateHP, generateIvs, generateStats, generateRandomMoves} = require('./statFunctions')
const {updatePokemonHp} = require('../db/stats')
const {getPokemonTypes} = require('../db/pokemon')
const {getMovesByPokemon} = require('../db/moves')
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
    const returnDmg = damage({attackingTypes: attackingPokemonTypes, defendingTypes: defendingPokemonTypes, pokemonAttacking:attackingPokemon, pokemondefending:defendingPokemon, move:move, critical: crit})
    defendingPokemon.stats.hp.current_value -= returnDmg
    res.send({pokemon: defendingPokemon})
    }catch(error) {
        console.error("There was an erroring posting to /attack in the backend API", error)
        throw error
    }
})
encounterRouter.post('/defend', async (req, res, next) => {
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
       
        const returnDmg = damage({attackingTypes: attackingPokemonTypes, defendingTypes: defendingPokemonTypes, pokemonAttacking:attackingPokemon, pokemondefending:defendingPokemon, move:move, critical: crit})
        let remaining = defendingPokemon.stats.hp.current_value -= returnDmg
        await updatePokemonHp({hp:remaining, id: defendingPokemon.stats.hp.id})
        res.send({pokemon: defendingPokemon})
    }catch(error) {
        console.error("There was an error making a call to defend in the API", error)
        throw error
    }
})
encounterRouter.post('/selectMove', async(req, res, next) => {
    try {
        const {moves} = req.body
        let randomMove = moves[Math.floor(Math.random() * moves.length)]
        res.send(randomMove)
    }catch(error) {
        console.error("There was an error selecting the random move by the pokemon", error)
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
    pokemon['moves'] = []
    //generate the moves of the pokemon
    

    //Generate The Ivs Of the Pokemon
    
    generateIvs(pokemon)
    
    //Generate The Hp For The Pokemon
    generateHP(pokemon)
   
    //Generate The Stats of the Random Pokemon
    
    generateStats(pokemon)

    await generateRandomMoves(pokemon)

    res.send(pokemon)
    }catch(error) {
        console.error("there was an error with encounter pokemon API", error)
        error
    }
})


module.exports = encounterRouter