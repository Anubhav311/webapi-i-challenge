// implement your API here
const express = require('express');
const db = require('./data/db');
const server = express();
server.use(express.json());


server.post('/api/users', (req, res) => {
    const userInformation = req.body;
    console.log(userInformation.name);

    if (userInformation.name && userInformation.bio) {
        db.insert(userInformation)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({error: "There was an error while saving the user to the database"})
        })

    } else {
        db.insert(userInformation)
        .then()
        .catch(err => {
            res.status(400).json({errorMessage: "Please provide name and bio for the user."})
        })
    }
})

server.get('/api/users', (req, res) => {
    db.find()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({ error: "The users information could not be retrieved." })
        })
})

server.listen(5000, () => {
    console.log('API running on port 5000')
})