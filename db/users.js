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

module.exports = {
    createUser,
    getUserById,
    getUserByUsername,
    getUserCash,
    updateUserCash
}