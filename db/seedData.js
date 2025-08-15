const client = require('./index')

const createSeedDataTable = async() => {
    try {
        const {rows: [isSeeded]} = await client.query(`
            INSERT INTO "isSeeded" ("seedValue")
            VALUES ($1)
            RETURNING *;
        `, [true])
        return isSeeded
    }catch(error) {
        console.error("There was an error creating seed data table in db/seed", error)
    }
}
const checkSeededData = async() => {
    try {
        const {rows: [isSeeded]} = await client.query(`
            SELECT * FROM "isSeeded";
        `)
            return isSeeded ? isSeeded.seedValue : false
    }catch(error) {
        console.error("There was an error checking the if the data is seeded in db/seed", error)
    }
}

module.exports = {
    createSeedDataTable,
    checkSeededData
}