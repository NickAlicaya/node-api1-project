// import express from 'express'; // ES2015 module syntax
const express = require('express'); // CommonJS modules

const Users = require('./data/db.js');

const server = express();

//middleware to parse/understand JSON
server.use(express.json())

// routes or endpoints

// GET to "/"

//| GET    | /api/users     | Returns an array of all the user objects contained in the database. 
server.get('/', function(request, response) {
  response.send({ hello: 'Users' });
});

//see a list of Users
server.get('/api/users',(req,res) => {
// read the data from the database (Db)
    Users.find() //return a promise
    .then(users => {
        console.log("Users",users);
        res.status(200).json(users)
    })
    .catch(error => {
        console.log(error);
        //handle the error
        res.status(500).json()
    })
})

//| GET    | /api/users/id    | Returns a specific user based on id. 
 
  server.get('/api/users/:id',(req,res) => {
  // read the data from the database (Db)
        const id = req.params.id;

      Users.findById(id) //return a promise
      .then(users => {
          console.log("User by id",users);
          res.status(200).json(users)
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