const { Client } = require("pg");
//Imports PostGres Databse so we can make it.


const {DATABASE_URL = "postgres://localhost:5432/pokemon"} = process.env

const client = new Client( {
    connectionString: DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? {rejectUnauthorized : false} : undefined
})

module.exports = client