const mongoose = require('mongoose')
const { Schema } = mongoose

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

const Baker = mongoose.model('Baker', bakerSchema)
module.exports = Baker