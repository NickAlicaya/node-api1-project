// import express from 'express'; // ES2015 module syntax
const express = require("express"); // CommonJS modules

const Users = require("./data/db.js");

const server = express();

//middleware to parse/understand JSON
server.use(express.json());

// routes or endpoints

// create a User
// | POST   | /api/users     | Creates a user using the information sent inside the `request body`.

// create a User
server.post("/api/users", (req, res) => {
	const { name, bio } = req.body; // for this to work you need the server.use(express.json()); above

	// never trust the client, validate the data. for now we trust the data for the demo
	Users.insert({ name, bio })
		.then(user => {
			if (!name || !bio) {
				res
					.status(400)
					.json({ errMsg: "Please provide a user name and password" });
			} else {
				res.status(201).json(user);
			}
		})
		.catch(error => {
			console.log(error);
			// handle the error
			res.status(500).json({
				errorMsg: "There was an error while saving the user to the database"
			});
		});
});

//| GET    | /api/users     | Returns an array of all the user objects contained in the database.
server.get("/", function(request, response) {
	response.send({ hello: "Users" });
});

//see a list of Users
server.get("/api/users", (req, res) => {
	// read the data from the database (Db)
	Users.find() //return a promise
		.then(users => {
			console.log("Users", users);
			res.status(200).json(users);
		})
		.catch(error => {
			console.log(error);
			//handle the error
			res.status(500).json();
		});
});

//| GET    | /api/users/id    | Returns a specific user based on id.

server.get("/api/users/:id", (req, res) => {
	// read the data from the database (Db)
	const id = req.params.id;

	Users.findById(id) //return a promise
		.then(users => {
			console.log("User by id", users);
			res.status(200).json(users);
		})
		.catch(error => {
			console.log(error);
			//handle the error
			res.status(500).json();
		});
});

// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.
server.delete("/api/hubs/:id", (req, res) => {
	const id = req.params.id;

	Users.remove(id)
		.then(deleted => {
			if (!deleted) {
				res.status(404).json({
					errorMessage: "The user with the specified ID does not exist."
				});
			} else {
				// res.status(204).end();
				res.status(200).json(deleted);
			}
		})
		.catch(error => {
			console.log(error);
			// handle the error
			res.status(500).json({
				errorMessage: "The user could not be removed"
			});
		});
});

//update a User
// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`.

server.put("/api/users/:id", (req, res) => {
	const id = req.params.id;
	const { name, bio } = req.body;
	if (!name || !bio) {
		return res
			.status(400)
			.json({ errorMsg: "Please provide a user name and bio." });
	}
	Users.update(id, { name, bio })
		.then(updated => {
			if (updated) {
				Users.findById(id).then(user => {
					res.status(201).json(user);
				});
			} else {
				res
					.status(404)
					.json({ errorMsg: `The user with id ${id} was not found.` });
			}
		})
		.catch(err => {
			console.log(err);
			//handle the error
			res.status(500).json({
				errorMsg: "Sorry, we ran into an error updating the specified user."
			});
		});
});

const port = 8000;
server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`));
// type: npm i express to install the express library
// to run the server type: npm run server
