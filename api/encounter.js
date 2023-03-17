const express = require('express')
const encounterRouter = express.Router()
const { generateHP, generateIvs, generateStats, generateRandomMoves, } = require('./statFunctions')
const {updatePokemonHp, updateExp, getPokemonlevel, getPokemonMaxExp, getUserPokemonLevel, getPokemonStats, updatePlayerPokemonStats} = require('../db/stats')
const {getPokemonTypes, checkUserPokemonHp, getUserPokemonBySlot} = require('../db/pokemon')
const {getMovesByPokemon} = require('../db/moves')
const {damage, experienceGainedInclusive} = require('./battle')

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
    if (defendingPokemon.stats.hp.current_value <= 0) {
        defendingPokemon.stats.hp.current_value = 0
    }
    res.send({pokemon: defendingPokemon, message:`${attackingPokemon.name} used ${move.name}!`})
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
        
        if (remaining <= 0) {
           
            await updatePokemonHp({hp:0, id: defendingPokemon.stats.hp.id})
        }else {
            await updatePokemonHp({hp:remaining, id: defendingPokemon.stats.hp.id})
        }
        res.send({message: `${attackingPokemon.name} used ${move.name}!`})
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

encounterRouter.get('/healthCheck', async(req, res, next) => {
    try {
        const checkPokemon = await checkUserPokemonHp(req.user.id)
        if(checkPokemon.length < 1) {
            res.send({message:"You have no pokemon left!"})
        }else {
            res.send({clear: 'execute'})
        }
    }catch(error) {
        console.error("There was an error getting a pokemon health check", error)
        throw error
    }
})

encounterRouter.post('/encounterPokemon', async (req, res, next) => {
    try {
    const {pokemon} = req.body
    console.log(pokemon)
    const randomLevel = pokemon.levels[Math.floor((Math.random() * 99))]
    
    //Generates random exp for pokemon
    let maxExpPossible = await getPokemonMaxExp(pokemon.pokemon_id)
    let randomExp = Math.floor(Math.random() * maxExpPossible.exp)

    
    let level = await getPokemonlevel({id: pokemon.pokemon_id, exp: randomExp})
    let stats = await getPokemonStats(pokemon.pokemon_id)
    
    generateIvs(stats)
    
    //Generate The Hp For The Pokemon
    generateHP(stats, level.level)
   
    //Generate The Stats of the Random Pokemon
    
    generateStats(stats, level.level)
    
    
    pokemon['stats'] = stats
    pokemon['level'] = level.level
    pokemon['exp'] = randomLevel.exp
    pokemon['isWild'] = true
    pokemon['moves'] = []
    //generate the moves of the pokemon
    

    //Generate The Ivs Of the Pokemon
    
 

    await generateRandomMoves(pokemon)

    res.send(pokemon)
    }catch(error) {
        console.error("there was an error with encounter pokemon API", error)
        error
    }
})

encounterRouter.post('/expGain', async (req, res, next) => {
    try {
        const {pokemonParticipating, faintedPokemonBaseExperience, faintedPokemonLevel} = req.body
        
        const exp = experienceGainedInclusive({pokemon: Object.keys(pokemonParticipating).length, faintedPokemonLevel: faintedPokemonLevel, fainedPokemonBaseExp: faintedPokemonBaseExperience})
        const alivePok = await checkUserPokemonHp(req.user.id)
        console.log(alivePok)
        for(let i = 0; i < alivePok.length; i++) {
            let firstLevel = await getUserPokemonLevel(alivePok[i].id)
            let newExp = await updateExp({exp: exp, pokemonId:alivePok[i].id})
            let level = await getUserPokemonLevel(alivePok[i].id)
            if (firstLevel == level) {
                continue
            }else {
                let current = await getUserPokemonBySlot({slot: alivePok[i].slot, id:req.user.id})
                let pokeStats = await getPokemonStats(current.pokemon_id)
                console.log(current)
                for(let key in pokeStats) {
                    pokeStats[key]['individual'] = current.stats[key].individual
                }
                generateHP(pokeStats, level)
                generateStats(pokeStats, level)
                for(let key in current.stats) {
                    await updatePlayerPokemonStats({id: current.stats[key].id, value: pokeStats[key].value})
                }
            }       
        }
        res.send({message: "Hello there"})
    }catch(error) {
        console.error("There was an error calling /expGain", error)
        throw error
    }
})



module.exports = encounterRouter