const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

// config
require('dotenv').config()
const PORT = process.env.PORT
const app = express()

// middleware
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.use(methodOverride('_method'))

// mongoose
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true},
	() => { console.log('Connected to mongo: ', process.env.MONGO_URI) }	
)

// routes
app.get('/', (req, res) => {
	res.send('Welcome to an Awesome App about Breads!')
})

// breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// bakers
const bakersController = require('./controllers/bakers_controller.js')
app.use('/bakers', bakersController)

// 404
app.get('*', (req, res) => {
	res.render('404')
})

// listen
app.listen(PORT, () => {
	console.log('nomming at port', PORT)
})