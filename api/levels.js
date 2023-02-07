const {createExperienceRate, createLevels, getAllLevels} = require('../db/experince_rate')
const express = require('express')
const levelRouter = express.Router()

levelRouter.get('/', async (req, res, next) => {
    try {
        let allLevels = await getAllLevels()
        res.send({levels: allLevels})
    }catch(error) {
        console.error("There was an error getting all the moves", error)
        throw error
    }
})
levelRouter.post('/', async(req, res, next) => {
    try {
    const {name, levels} = req.body
    const rateName = await createExperienceRate(name)
    for(let i = 0; i < levels.length; i++) {
        await createLevels({exp: levels[i].experience, level: levels[i].level, experience_rate_id: rateName.id})
    }
    res.send({message: "Success!"})
    }catch(error) {
        console.error("There was an error posting the levels", error)
        throw error
    }
})

module.exports = levelRouter