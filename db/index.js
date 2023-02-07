const { Client } = require("pg");
//Imports PostGres Databse so we can make it.

const client = new Client("postgres://localhost:5432/pokemon");


module.exports = client