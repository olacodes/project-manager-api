const express = require('express')
const morgan = require('morgan')


const app = express()

if (process.env.NODE_ENV === 'developement') {
    app.use(morgan('dev'))
}
app.use(express.json())


// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
  }));
module.exports =  app
