const client = require('./index')

const createShopItem = async({description, cost, name, category}) => {
    try {
        const {rows: [item]} = await client.query(`
        INSERT INTO shopItems (cost, name, description, category)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `, [cost, name, description, category])
        console.log(item)
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
        console.log(items)
        return items
    }catch(error){
        console.error("There was an error getting all the shop items", error)
        throw error
    }
}

module.exports = {
    getAllItems, 
    createShopItem
}