const express = require('express')
const { getAllItems, createShopItem, createPlayerItem, getItemsByName, getItemById} = require('../db/shop')
const {getUserCash, updateUserCash, getPlayerItemById, updatePlayerItem} = require('../db/users') 
const shopRouter = express.Router()

shopRouter.post('/purchase', async(req, res, next) => {
    try {
        const {itemId, quantity} = req.body
        const item = await getItemById(itemId)
        const price = item.cost * quantity
        const userCash = await getUserCash(req.user.id)
        if (price > userCash.cash) {
            res.send({error: "InvalidFunds", message: "You do not have enough money to purchase this item"})
        }else {
            let checkExist = await getPlayerItemById({id: itemId, userId: req.user.id})
            if(!checkExist) {
                const createdItem = await createPlayerItem({quantity: quantity, userId: req.user.id, itemId: itemId})
            }else {
                const updatedItem = await updatePlayerItem({userId: req.user.id, itemId: checkExist.id, value: quantity})
            }
            const updatedCash = await updateUserCash({id: req.user.id, cash: -price})
            res.send({message: "Success"})
        }
        
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

shopRouter.get('/:item', async(req, res, next) => {
    try {
        
        const items = await getItemsByName(req.params.item)
        res.send(items)
    }catch(error) {
        console.error("There was an error getting the shop items by name in api/shop", error)
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