const express = require('express')
const { getAllItems, createShopItem, createPlayerItem } = require('../db/shop')
const shopRouter = express.Router()

shopRouter.post('/purchase', async(req, res, next) => {
    try {
        const {itemId, quantity} = req.body
        console.log(req.body)
        const item = await createPlayerItem({quantity: quantity, userId: req.user.id, itemId: itemId})
        res.send(item)
    }catch(error) {
        console.error("there was an erroring purchasing an item", error)
        throw error
    }
})

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