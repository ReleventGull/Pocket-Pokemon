const express = require('express')
const seedRouter = express.Router()
const { createSeedDataTable, checkSeededData } = require('../db/seedData')


seedRouter.get('/checkSeeded', async(req, res, next) => {
    try {
        const checkIfSeeded = await checkSeededData()
        res.send({value: checkIfSeeded})
    }catch(error) {
        console.error("There was an error launching the seed data in api/seedData", error)
        throw error
    }
})

seedRouter.get("/createSeeded", async(req, res, next) => {
    try {
        const createSeeded = await createSeedDataTable()
        res.send({value: createSeeded})
    }catch(error) {
        console.error("There was en error creating the seeded table in api/seedData", error)
        throw error
    }
})

module.exports = seedRouter