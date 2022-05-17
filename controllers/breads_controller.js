const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

// index
breads.get('/', (req, res) => {
	Bread.find()
		.then(foundBreads => {
			res.render('index', 
			{
				breads: foundBreads,
				title: 'Index Page'
			}
		)
	})
})

// new
breads.get('/new', (req, res) => {
	res.render('new')
})


// edit
breads.get('/:arrayIndex/edit', (req, res) => {
	res.render('edit', {
		bread: Bread[req.params.arrayIndex],
		index: req.params.arrayIndex
	})
})

// show
breads.get('/:arrayIndex', (req, res) => {
	Bread.findById(req.params.arrayIndex)
		.then(foundBread => {
			res.render('show', {
				bread: foundBread
			})
		})
	
	// if (Bread[req.params.arrayIndex]) {
	// 	res.render('show', {
	// 		bread: Bread[req.params.arrayIndex],
	// 		index: req.params.arrayIndex
	// 	})
	// } else {
	// 	res.render('404')
	// }
})

// create
breads.post('/', (req, res) => {
	// validate image
	if (!req.body.image || !req.body.image.startsWith('https') || req.body.image.startsWith('http')) {
		// default image is handled by the schema
		req.body.image = undefined
	}

	// switch checkbox state from 'on' to true/false
	if (req.body.hasGluten === 'on') {
		req.body.hasGluten = true
	} else {
		req.body.hasGluten = false
	}

	// push the changes to the database and redirect to the index page
	Bread.create(req.body)
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