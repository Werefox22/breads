const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

// index
breads.get('/', (req, res) => {
	res.render('index', 
		{
			breads: Bread,
			title: 'Index Page'
		}
	)
})

// show
breads.get('/:arrayIndex', (req, res) => {
	res.render('Show', {
		bread: Bread[req.params.arrayIndex]
	})
})

module.exports = breads