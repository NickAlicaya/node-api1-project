// import express from 'express'; // ES2015 module syntax
const express = require('express'); // CommonJS modules

const Users = require('./data/db.js');

const server = express();

//middleware to parse/understand JSON
server.use(express.json())

// routes or endpoints

// GET to "/"

server.get('/', function(request, response) {
  response.send({ hello: 'Web 25!' });
});

//see a list of Hubs
server.get('/api/hubs',(req,res) => {
// read the data from the database (Hubs)
    Users.find() //return a promise
    .then(hubs => {
        res.status(200).json(hubs)
    })
    .catch(error => {
        console.log(error);
        //handle the error
        res.status(500).json()
    })
})

const port = 8000;
server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`));
// type: npm i express to install the express library
// to run the server type: npm run server