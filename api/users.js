const express = require('express')
const userRouter =  express.Router()
const {getMoveByPokemon, createPlayerPokemonMove} = require('../db/moves')
const {createUser, getUserById, getUserByUsername} = require('../db/users')
const {getPokemonById, createPlayerPokemon, createPlayerPokmonStats, getUserPokemon} = require('../db/pokemon')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env


userRouter.post('/register', async(req, res, next) => {
    try {
        const {pokemonId, password, username, name} = req.body
        let pokemonById = await getPokemonById(pokemonId)
        let pokemonMoves = await getMoveByPokemon(pokemonById.name)
        let attackMoves = pokemonMoves.filter(move => move.power > 0)
        let randomMove = attackMoves[Math.floor(Math.random() * attackMoves.length)]
        console.log('Random move here', randomMove)

        const newUser = await createUser({name:name, username:username, password:password})
        const createdUser = await getUserById(newUser.id)
        const newPlayerPokemon = await createPlayerPokemon({
            name: pokemonById.name,
            onPlayer : true,
            exp: pokemonById.baseExperience,
            pokemon_id: pokemonById.id,
            user_id: createdUser.id,
            level: 1
        })
        console.log('Player pokemon here', newPlayerPokemon.id)
        const playerPokeMove = await createPlayerPokemonMove({
            move_id:randomMove.id,
            pokemon_id: newPlayerPokemon.id,
            current_pp: randomMove.pp
        })
        for(let key in pokemonById.stats) {
            await createPlayerPokmonStats({
                name: key,
                effort: pokemonById.stats[key].effort,
                value: pokemonById.stats[key].value,
                currentValue:pokemonById.stats[key].value,
                individual: Math.floor(Math.random() * 31),
                player_pokemon_id: newPlayerPokemon.id
            })
        }
        const token = jwt.sign(createdUser, JWT_SECRET)
        res.send({message: `Welcome ${newUser.name}!`, token: token})
    }catch(error) {
        console.error("There was an error registering the user", error)
        throw error
    }
})

userRouter.post('/registerCheck', async(req,res,next) => {
    try {
        const {password, username, name} = req.body
        const existingUser = await getUserByUsername(username)
        if(existingUser)  {
            res.status(401).send({
                error: "UserTake",
                message:"A user by that username already exists"
            })
        }else {
            res.send({message:"Clear!"})
        }
    }catch(error) {
        console.error("There was an error registering the account")
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
        console.error("There was an error logging in the user", error)
        throw error
    }
})

module.exports = userRouter