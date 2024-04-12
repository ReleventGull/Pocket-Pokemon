const express = require('express')
const userRouter =  express.Router()
const {getMoveByPokemon, createPlayerPokemonMove} = require('../db/moves')
const {createUser, getUserById, getUserByUsername, getUserCash} = require('../db/users')
const {getPokemonById, createPlayerPokemon, createPlayerPokmonStats, getUserPokemonBySlot} = require('../db/pokemon')
const jwt = require('jsonwebtoken')
const { getPokemonStats } = require('../db/stats')
const { generateIvs, generateHP, generateStats } = require('./statFunctions')
const {JWT_SECRET} = process.env


userRouter.post('/register', async(req, res, next) => {
    try {
        const {pokemonId, password, username, name} = req.body
        let pokemonById = await getPokemonById(pokemonId)
        let stats = await getPokemonStats(pokemonId)
        
        generateIvs(stats)
        generateHP(stats, 1)
        generateStats(stats, 1)
        console.log("stats", stats)
        let pokemonMoves = await getMoveByPokemon(pokemonById.name)
    
        let attackMoves = pokemonMoves.filter(move => move.power > 0)
        let randomMove = attackMoves[Math.floor(Math.random() * attackMoves.length)]

        const newUser = await createUser({name:name, username:username, password:password})
        const createdUser = await getUserById(newUser.id)
        const newPlayerPokemon = await createPlayerPokemon({
            name: pokemonById.name,
            onPlayer : true,
            exp: 0,
            pokemon_id: pokemonById.id,
            user_id: createdUser.id,
            level: 1,
            slot: 1
        })
        const playerPokeMove = await createPlayerPokemonMove({
            move_id:randomMove.id,
            pokemon_id: newPlayerPokemon.id,
            current_pp: randomMove.pp
        })
        for(let key in stats) {
            await createPlayerPokmonStats({
                name: key,
                effort: stats[key].effort,
                value: stats[key].value,
                currentValue: stats[key].value,
                individual: stats[key].individual,
                player_pokemon_id: newPlayerPokemon.id
            })
        }
        await getUserPokemonBySlot({slot: 1, id: createdUser.id})
        const token = jwt.sign(createdUser, JWT_SECRET)
        res.send({message: `Welcome ${newUser.name}!`, token: token})
    }catch(error) {
        console.error("There was an error registering the user in api/users", error)
        throw error
    }
})

userRouter.post('/registerCheck', async(req,res,next) => {
    try {
        const {password, username, name} = req.body
        const existingUser = await getUserByUsername(username)
        console.log("I got hit here")
        if(existingUser)  {
            res.status(401).send({
                error: "UserTake",
                message:"That username already exists"
            })
        }else {
            res.send({message:"Clear!"})
        }
    }catch(error) {
        console.error("There was an error registering the account in api/users")
    }
})

userRouter.post('/login', async(req, res, next) => {
    try {
        const {username, password} = req.body
        const checkUser = await getUserByUsername(username)
        if(!checkUser) {
            res.status(401).send({
                error: "Invalid Credentials",
                message: "Username or password is incorrect!"
            })
        }else {
            if (checkUser.password !== password) {
                res.status(401).send({
                    error: "Invalid Credentials",
                    message: "Username or password is incorrect!"
                })
            }else {
                let correctUser = await getUserById(checkUser.id)
                let token = jwt.sign(correctUser, JWT_SECRET)
                res.send({message:`Welcome ${correctUser.name}`, token})
            }
        }
    }catch(error) {
        console.error("There was an error logging in the user in api/users", error)
        throw error
    }
})
userRouter.get('/cash', async(req, res, next) => {
    try {
        const cash = await getUserCash(req.user.id)
        
        res.send({cash: cash})
    }catch(error){
        console.error("There was an error getting user cash in api/users", error)
        throw error
    }
})

module.exports = userRouter