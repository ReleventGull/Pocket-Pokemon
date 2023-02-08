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
        console.error("There was an error creating the user", error)
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
        console.error("There was an error getting the user by the id", id)
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
        console.error("There was an error getting the user by their username", error)
        throw error
    }
}


module.exports = {
    createUser,
    getUserById,
    getUserByUsername
}