const client = require('./index')

const createUser = async({name, username, password}) => {
    try {
        const {rows: [user]} = await client.query(`
        INSERT INTO users (name, username, password)
        VALUES ($1, $2, $3)
        RETURNING *
        `, [name, username, password])
        delete user.password
        return user
    }catch(error) {
        console.error("There was an error creating the user in db/users", error)
        throw error
    }
}
const getUserById = async(id) => {
    try {
        const {rows: [user]} = await client.query(`
        SELECT users.id, users.username, users.name
        FROM users
        WHERE id=$1
        `, [id])
        return user
    }catch(error) {
        console.error("There was an error getting the user by the id in db/users", id)
        throw error
    }
}
const getUserByUsername = async(username) => {
    try {
        const {rows: [user]} = await client.query(`
        SELECT * FROM users
        WHERE username=$1
        `, [username])
        return user
    }catch(error) {
        console.error("There was an error getting the user by their username in db/users", error)
        throw error
    }
}

const getUserCash = async(id) => {
    try {
        const {rows: [cash]} = await client.query(`
        SELECT cash FROM users
        WHERE id=$1
        `, [id])
        return cash
    }catch(error) {
        console.error("There was an error getting the user cash in db/users")
    }
}

const updateUserCash = async({id, cash}) => {
    try {
        const {rows: result} = await client.query(`
        UPDATE users
        SET cash = cash + $1
        WHERE id=$2
        RETURNING *;
        `, [cash, id])
        return result
    }catch(error) {
        console.error("There was an error updating the user cash in db/users", error)
        throw error
    }
}

const updatePlayerItem = async({userId, itemId, value}) => {
    try {
        const {rows: [item]} = await client.query(`
        UPDATE playerItems
        SET quantity = quantity + $1
        WHERE user_id = $2 AND item_id = $3
        RETURNING *;
        `, [value, userId, itemId])
        return item
    }catch(error) {
        console.error("There was an error updating player item", error)
        throw error
    }
}

const getPlayerItemById = async({id, userId}) => {
    try {
    const {rows: [item]} = await client.query(`
    SELECT * FROM playerItems
    WHERE user_id = $1 AND item_id=$2
    `, [userId, id])
    return item
    }catch(error) {
        console.error("There was an error getting the player item by id", error)
        throw error
    }
}

const getAllPlayerItems = async (id) => {
    try {
        const {rows: items} = await client.query(`
        SELECT playerItems.quantity, shopItems.name, shopItems.description, shopItems.category
        FROM playerItems
        JOIN shopItems
        ON playerItems.item_id=shopItems.id
        WHERE playerItems.user_id=$1;
        `, [id])
        console.log("Am I getting the items?")
        return items
    }catch(error) {
        console.error("There was an error getting all the player items in db/users", error)
        throw error
    }
}

const getPlayerItemsByCategory = async({userId, category}) =>{
    try {
        const {rows: items} = await client.query(`
            SELECT playerItems.quantity, shopItems.name, shopItems.description, shopItems.category
            FROM playerItems
            JOIN shopItems
            ON playerItems.item_id=shopItems.id AND shopItems.category=$2
            WHERE playerItems.user_id=$1;
            `, [userId, category])
            console.log("In the database ", userId, )
            return items
    }catch(error) {
        console.error("There was an error getting the user items by cat in DB", error)
        throw error
    }
}

module.exports = {
    createUser,
    getUserById,
    getUserByUsername,
    getUserCash,
    updateUserCash,
    getPlayerItemById,
    updatePlayerItem,
    getAllPlayerItems,
    getPlayerItemsByCategory
}