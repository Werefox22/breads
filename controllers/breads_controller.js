const express = require('express')
const breads = express.Router()

// index
breads.get('/', (req, res) => {
	res.send("This is the index at /breads")
})

module.exports = breads