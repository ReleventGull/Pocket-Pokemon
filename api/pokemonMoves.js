const express = require('express')
const movesRouter = express()
const {getAllmoves} = require('../db/moves.js')

movesRouter.get('/', async(req, res, send) => {
    try {
    const moves = await getAllmoves()
    res.send(moves)
    }catch(error) {
        next(error)
    }
})





module.exports = movesRouter