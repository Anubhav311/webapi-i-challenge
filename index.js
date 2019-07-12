// implement your API here
const express = require('express');
const cors = require('cors');
const db = require('./data/db');
const server = express();
server.use(express.json());
server.use(cors());

// server.get('/', (req, res) => {
//     console.log(db.findById(8));
// })

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
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
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

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    db.findById(userId)
        .then(user => {
            console.log(user)
            if(user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({message: "The user with the specified ID does not exist."})
            }
        }) 
        .catch(err => {
            res.status(500).json({error: "The user information could not be retrieved."})
        })
})

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    db.remove(userId)
        .then(user => {
            if(number) {
                res.status(200).json(number);
            } else {
                res.status(404).json({message: "The user with the specified ID does not exist."})
            }
        })
        .catch(err => {
            res.status(500).json({error: "The user could not be removed"})
        })
})

server.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const userInformation = req.body

    if (userInformation.name && userInformation.bio) {
        db.update(userId, userInformation)
        .then(response => {
            if(response) {
                res.status(200).json(response)
            } else {
                res.status(404).json({message: "The user with the specified ID does not exist."})
            }
        })
        .catch(err => {
            res.status(500).json({error: "The user information could not be modified."})
        })
    } else {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }

})

server.listen(5000, () => {
    console.log('API running on port 5000')
})