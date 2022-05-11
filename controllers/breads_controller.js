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

// new
breads.get('/new', (req, res) => {
	res.render('new')
})

// show
breads.get('/:arrayIndex', (req, res) => {
	if (Bread[req.params.arrayIndex]) {
		res.render('Show', {
			bread: Bread[req.params.arrayIndex],
			index: req.params.arrayIndex
		})
	} else {
		res.render('404')
	}
})

// create
breads.post('/', (req, res) => {
	// validate image
	if (!req.body.image || !req.body.image.startsWith('https') || req.body.image.startsWith('http')) {
		req.body.image = 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
	}

	// switch checkbox state from 'on' to true/false
	if (req.body.hasGluten === 'on') {
		req.body.hasGluten = true
	} else {
		req.body.hasGluten = false
	}
	// push the changes to the database and redirect to the index page
	Bread.push(req.body)
	res.redirect('/breads')
})

// delete
breads.delete('/:arrayIndex', (req, res) => {
	Bread.splice(req.params.arrayIndex, 1)
	res.status(303).redirect('/breads')
})

// update
breads.put('/:arrayIndex', (req, res) => {
	// switch checkbox state from 'on' to true/false
	if (req.body.hasGluten === 'on') {
		req.body.hasGluten = true
	} else {
		req.body.hasGluten = false
	}

	// push the changes to the database and redirect to the page we just edited
	Bread[req.params.arrayIndex] = req.body
	res.redirect(`/breads/${req.params.arrayIndex}`)
})

module.exports = breads