const express = require('express')
const encounterRouter = express.Router()
const { generateHP, generateIvs, generateStats } = require('./statFunctions')
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