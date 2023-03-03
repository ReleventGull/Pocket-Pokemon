const express = require('express')
const { getAllItems, createShopItem } = require('../db/shop')
const shopRouter = express.Router()

shopRouter.post('/', async(req,res, next) => {
    try {
        const {cost, name, description, category} = req.body
        let item = await createShopItem({category: category, cost: cost, name: name, description: description})
        res.send(item)
    }catch(error) {
        console.error("There was an error seeind the shop data")
        throw error
    }
})

shopRouter.get('/', async(req, res, next) => {
    try {
        const items = await getAllItems()
        res.send(items)
    }catch(error) {
        console.error("There was an error getting all the shop items", error)
        throw error
    }
})

module.exports = shopRouter