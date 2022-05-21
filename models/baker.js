const mongoose = require('mongoose')
const { Schema } = mongoose
const Bread = require('../models/bread.js')

// schema
const bakerSchema = new Schema({
	name: {
		type: String,
		required: true,
		enum: ['Rachel', "Monica", "Joey", "Chandler", "Ross", "Pheobe"]
	},
	startDate: {
		type: Date,
		required: true
	},
	bio: String
})

// virtuals
bakerSchema.virtual('breads', {
	ref: 'Bread',
	localField: '_id',
	foreignField: 'baker'
})

// model
const Baker = mongoose.model('Baker', bakerSchema)
module.exports = Baker