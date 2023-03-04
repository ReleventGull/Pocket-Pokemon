const client = require('./index')

const createShopItem = async({description, cost, name, category}) => {
    try {
        const {rows: [item]} = await client.query(`
        INSERT INTO shopItems (cost, name, description, category)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `, [cost, name, description, category])
        
        return item
    }catch(error) {
        console.error("There was an error creating the shop items", error)
        throw error
    }
}

const getAllItems = async() => {
    try {
        const {rows: items} = await client.query(`
        SELECT * FROM shopItems
        `)
        return items
    }catch(error){
        console.error("There was an error getting all the shop items", error)
        throw error
    }
}

const createPlayerItem = async({quantity, userId, itemId}) => {
    try {
        const {rows: item} = await client.query(`
        INSERT INTO playerItems (user_id, item_id, quantity)
        VALUES($1, $2, $3)
        RETURNING *
        `, [userId, itemId, quantity])
        return item
    }catch(error) {
        console.error("There was an error creating the player item", error)
        throw error
    }
}

module.exports = {
    getAllItems, 
    createShopItem,
    createPlayerItem
}