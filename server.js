const express = require('express')

// config
require('dotenv').config()
const PORT = process.env.PORT
const app = express()

// routes
app.get('/', (req, res) => {
	res.send('Welcome to an Awesome App about Breads!')
})

// breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// listen
app.listen(PORT, () => {
	console.log('nomming at port ', PORT)
})