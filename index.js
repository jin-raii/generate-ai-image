const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 4000
const HOST = '0.0.0.0'


// Enable body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Set static folder
app.use(express.static(path.join(__dirname, '/public/')))

app.use('/openai', require('./routes/openaiRoutes'))



app.listen(PORT,HOST, () => console.log(`server started on port ${PORT}`))
