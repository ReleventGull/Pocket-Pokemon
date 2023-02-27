const express = require('express')
const movesRouter = express()
const {createMove} = require('../db/moves.js')

movesRouter.get('/', async(req, res, send) => {
    try {
    const moves = await getAllmoves()
    res.send(moves)
    }catch(error) {
        next(error)
    }
})

movesRouter.post('/', async(req, res, next) => {
    try {
        const {name, type, category, pp, power, accuracy, learnedBy} = req.body
        for(let i = 0; i < learnedBy.length; i++) {
            const createdMove = await createMove({
                name: name,
                type: type,
                category: category,
                pp: pp,
                power: power,
                accuracy: accuracy,
                learnedBy: learnedBy[i].name
            })
        }
        res.send({message:"Completed!"})
    }catch(error) {
        console.error("There was an error creating the moves in the api", error)
        throw error
    }
})







module.exports = movesRouter