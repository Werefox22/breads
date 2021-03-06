const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
const Baker = require('../models/baker.js')

// index
breads.get('/', async (req, res) => {
	try {
		foundBakers = await Baker.find().lean()
		foundBreads = await Bread.find().limit(10).lean()
		res.render('index', {
			breads: foundBreads,
			bakers: foundBakers,
			title: 'Index Page'
		})
	} catch (err) {
		// Error page
		console.log("ERROR: ", err)
		res.render('error', {
			content: err
		})
	}
})

// new
breads.get('/new', (req, res) => {
	Baker.find()
		.then(foundBakers => {
			res.render('new', { bakers: foundBakers })
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
breads.get('/data/seed', (req, res) => {
	let newBreads = [
		{
			name: 'Rye',
			hasGluten: true,
			image: 'https://images.unsplash.com/photo-1595535873420-a599195b3f4a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
		},
		{
			name: 'French',
			hasGluten: true,
			image: 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
		},
		{
			name: 'Gluten Free',
			hasGluten: false,
			image: 'https://images.unsplash.com/photo-1546538490-0fe0a8eba4e6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
		},
		{
			name: 'Pumpernickel',
			hasGluten: true,
			image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
		}
	]
	  
	Bread.insertMany(newBreads)
	.then(createdBreads => {
		res.redirect('/breads')
	})
	.catch(err => {
		// Error page
		console.log("ERROR: ", err)
		res.render('error', {
			content: err
		})
	})
})

// edit
breads.get('/:arrayIndex/edit', (req, res) => {
	Baker.find()
		.then(foundBakers => {
			Bread.findById(req.params.arrayIndex)
			.then(foundBread => {
				res.render('edit', {
					bread: foundBread,
					bakers: foundBakers
				})
			})
			.catch(err => {
				// 404 page
				console.log("ERROR: ", err)
				res.status(404).render('404')
			})
		})
})

// show
breads.get('/:arrayIndex', (req, res) => {
	Bread.findById(req.params.arrayIndex)
		.populate('baker')
		.then(foundBread => {
			res.render('show', {
				bread: foundBread
			})
		})
		.catch(err => {
			// 404 page
			console.log("ERROR: ", err)
			res.status(404).render('404')
		})
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
		.then(createdBread => {
			res.redirect('/breads')
		})
		.catch(err => {
			// Error page
			console.log("ERROR: ", err)
			res.render('error', {
				content: err
			})
		})
})

// delete
breads.delete('/:arrayIndex', (req, res) => {
	Bread.findByIdAndDelete(req.params.arrayIndex)
	.then(deletedBread => {
		res.status(303).redirect('/breads')
	})
	.catch(err => {
		console.log('ERROR: ', err)
		res.status(404).render('404')
	})
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
	Bread.findByIdAndUpdate(req.params.arrayIndex, req.body)
	.then(() => {
		res.redirect(`/breads/${req.params.arrayIndex}`)
	})
	.catch(err => {
		console.log('ERROR: ', err)
		res.render('error', err)
	})
})

module.exports = breads