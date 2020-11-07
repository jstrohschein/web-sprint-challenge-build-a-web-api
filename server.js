const express = require('express')
const projecsRouter = require('./projects/projects-router')



const server = express()
server.use(express.json())
server.use('/api/projects', projecsRouter)


/* Default */
server.use('/', (req, res) => {
  res.send(`
  <h2>Welcome to Web Sprint Challenge API</h2>`)
})

module.exports = server