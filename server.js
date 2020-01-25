//IMPORT DEPENDENCIES
const express = require('express');

//USAGE OF EXPRESS IN SERVER 
const server = express()
//IMPORT ROUTER
const projectRouter = require('./project-Router')
//EXPRESS ROUTER
server.use(express.json());
server.use('/api/projects', projectRouter)
//GET SERVER
server.get('/', (req, res)=> {
    res.send(`<h2>Project API is working!</h2>`)
})
//EXPORT
module.exports = server