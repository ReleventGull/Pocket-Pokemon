const express = require('express')
const apiRouter = express.Router()
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env
const {getUserById} = require('../db/users')


apiRouter.use(async(req, res, next) => {
    const auth = req.header('Authorization')
    if(auth) {
        try {
            let tok = auth.split(' ')
            const [,token] = tok
            console.log("Token here", token)
            const {id} = jwt.verify(token, JWT_SECRET)
            req.user = await getUserById(id)
            next()
        }catch(error) {
            console.error("Token invalid", error) 
            throw error
        }
    }else {
        next()
    }
})


const pokeRouter = require('./pokemon')
const movesRouter = require('./pokemonMoves')
const encounterRouter = require('./encounter')
const playerRouter = require('./player')
const levelRouter = require('./levels')
const userRouter = require('./users')

apiRouter.use('/pokemon', pokeRouter)
apiRouter.use('/moves', movesRouter)
apiRouter.use('/encounter', encounterRouter)
apiRouter.use('/player', playerRouter)
apiRouter.use('/levels', levelRouter)
apiRouter.use('/users', userRouter)

module.exports = apiRouter




