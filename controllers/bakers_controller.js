const express = require('express')
const baker = express.Router()
const Baker = require('../models/baker.js')
const bakerSeedData = require('../models/baker_seed.js')

// index
baker.get('/', (req, res) => {
	Baker.find()
		.populate('breads')
		.then(foundBakers => {
			res.send(foundBakers)
		})
		.catch(err => {
			// Error page
			console.log("ERROR: ", err)
			res.render('error', {
				content: err
			})
		})
})

// seed
baker.get('/data/seed', (req, res) => {
	Baker.insertMany(bakerSeedData)
		.then(() => {
			res.redirect('/breads')
		})
		.catch(err => {
			console.log("ERROR: ", err)
			res.render('error', {
				content: err
			})
		})
})

module.exports = baker