const express = require('express')
const encounterRouter = express.Router()
const { generateHP, generateIvs, generateStats, generateRandomMoves, } = require('./statFunctions')
const {updatePokemonHp, updateExp, getPokemonlevel, getPokemonMaxExp, getUserPokemonLevel, getPokemonStats, updatePlayerPokemonStats} = require('../db/stats')
const {createPlayerPokmonStats, getPokemonTypes, checkUserPokemonHp, getUserPokemonBySlot, getUserPokemonExp, createPlayerPokemon} = require('../db/pokemon')
const {getMovesByPokemon, createPlayerPokemonMove} = require('../db/moves')
const {damage, experienceGainedInclusive, capture} = require('./battle')
const {updateUserCash, getPlayerItemByItemId, removePlayerItem, updatePlayerItem} = require('../db/users')
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
    const playerExp = await getUserPokemonExp(req.user.id)
   console.log('Player exp', playerExp)
    let totalExp = playerExp.reduce((acc, current) =>
         acc + current.exp, 
        0
    )/playerExp.length
    let randomExp = Math.floor(Math.random() * totalExp)
    let level = await getPokemonlevel({id: pokemon.pokemon_id, exp: randomExp})
    let stats = await getPokemonStats(pokemon.pokemon_id)
    generateIvs(stats)
    //Generate The Hp For The Pokemon
    generateHP(stats, level.level)
    //Generate The Stats of the Random Pokemon
    generateStats(stats, level.level)
    pokemon['stats'] = stats
    pokemon['level'] = level.level
    pokemon['exp'] = randomExp
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
        const {faintedPokemonBaseExperience, faintedPokemonLevel} = req.body
        const alivePok = await checkUserPokemonHp(req.user.id)
        const exp = experienceGainedInclusive({pokemon: alivePok.length, faintedPokemonLevel: faintedPokemonLevel, fainedPokemonBaseExp: faintedPokemonBaseExperience}) //8 is a placeholder for whatever the fuck cuz idk

        console.log('Alive pokemon', alivePok)
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
        //Cash Gain
        let cash = alivePok.length * 100 * faintedPokemonLevel
        const updatedCash = await updateUserCash({id: req.user.id, cash: cash})
        console.log("Updated cash", updatedCash)
        res.send({cash: cash})
    }catch(error) {
        console.error("There was an error calling /expGain", error)
        throw error
    }
})

encounterRouter.post('/useball', async(req, res, next) => {
    //Wil need user token
    //Will need item ID being sent.
    //Will need the current pokemon being fought
    const userId = req.user.id
    const {enemyPokemon, usedPokeball} = req.body
    console.log(enemyPokemon.stats)
    if(userId != usedPokeball.userId) {
        res.send({error: true, message: "You are no authorized to use this persons inventory!"})
        return
    }
    const checkPokeball = await getPlayerItemByItemId({itemId: usedPokeball.id, userId: userId})
    console.log('Checking pokeball:', checkPokeball)
    if(!checkPokeball) {
        res.send({error: true, message: "You are do not have this item in your inventory"})
        return
    }else {
        if(checkPokeball.quantity == 1) {
            await removePlayerItem({userId: userId, itemId: checkPokeball.id})
        }else {
            await updatePlayerItem({userId: userId, itemId: checkPokeball.id, value: -1})
        }
    }
    let pokeballCatchRate = null
    switch(checkPokeball.name) {
        case "poke-ball":
            pokeballCatchRate = 1
            break;
        case "great-ball" :
            pokeballCatchRate = 1.5
            break
        case "ultra-ball":
            pokeballCatchRate = 2
            break
        default: 
            return

    }
    const captureChance = capture({enemyPokemon: enemyPokemon, pokeballCatchRate: pokeballCatchRate})
    const randomValue = Math.floor(Math.random() * 100)
    if(randomValue <= captureChance) {
        let slot = null
        const userPokemon = await getUserPokemonExp(userId)
        userPokemon.length == 7 ? null : slot = userPokemon.length + 1
        const newPokemon = await createPlayerPokemon(
            {name: enemyPokemon.name, 
            onPlayer: true, 
            exp: enemyPokemon.exp,
            pokemon_id: enemyPokemon.pokemon_id,
            user_id: userId,
            slot: slot,
            })
            for(let key in enemyPokemon.stats) {
                console.log('THE VALUES HERE', key.value)
                await createPlayerPokmonStats({
                    name: key,
                    value: enemyPokemon.stats[key].value,
                    currentValue: enemyPokemon.stats[key].current_value,
                    effort: enemyPokemon.stats[key].effort,
                    individual: enemyPokemon.stats[key].individual,
                    player_pokemon_id: newPokemon.id
                })
            }
            enemyPokemon.moves.forEach(async element => {
                await createPlayerPokemonMove({
                    move_id: element.id,
                    pokemon_id: newPokemon.id,
                    current_pp: element.pp
                })
            });
            console.log(newPokemon)
        res.send({shakes: 3, success: true, ball: checkPokeball.name, message: `${enemyPokemon.name} has been caught!`})
    }else {
        let shakeCount = 0;
        if (randomValue <= captureChance + 60) shakeCount = 3;  // "So close!"
        else if (randomValue <= captureChance + 80) shakeCount = 2; // "Almost!"
        else if (randomValue <= captureChance + 95) shakeCount = 1; // "Barely!"
        res.send({success: false, shakes: shakeCount, ball: checkPokeball.name, message: `${enemyPokemon.name} got out!`})
    }
   
})

module.exports = encounterRouter