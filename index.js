// implement your API here
const express = require('express');
const db = require('./data/db');
const server = express();

server.get('/', (req, res) => {
    res.send("it's working")
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