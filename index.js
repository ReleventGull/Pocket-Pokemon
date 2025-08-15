require('dotenv').config()
const express = require('express')
const cors = require('cors');
const apiRouter = require('./api/index')
const morgan = require('morgan')
const client = require('./db/index')
const path = require('path');

//Connect to the database

client.connect()

//Define Express Function
const app = express()

//Define our PORT
const {PORT = 4000} = process.env


//For Logging

app.use(cors())
app.use(express.static(require('path').join(__dirname, 'build')));
app.get('*', (req, res ,next) => {
res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.use(morgan('dev'))
app.use(express.json())

//Use all our routes

app.use('/api', apiRouter, (req,res,next) => {
    res.send("Welcome to the Pokemon API! Here is where we store all the pokemon data so that you can use algorithms in order to develop the game. Enjoy!")
})

//Show that our port is current up and running
app.listen(PORT, () => {
    console.log("I'm lisening on PORT ", PORT)
})
