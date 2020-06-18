const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const thingsDB = require('./things-db.js')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello!')
})

app.get('/api', (req, res) => {
    thingsDB.getAllThings().then((result) => {
        res.json(result)
    }).catch((error) => {
        res.json(error)
    })
})

app.get('/api/:id', (req, res) => {
    thingsDB.getThing(req.params.id).then((result) => {
        console.log(result)
        res.json(result)
    }).catch((error) => {
        res.json(error)
    })
})

app.post('/api/', (req, res) => {
    const { name, description } = req.body

    if (!name || !description) {
        res.json(0)
    }

    thingsDB.insertThing(name, description).then((result) => {
        res.json(result)
    }).catch((error) => {
        res.json(error)
    })
})

app.put('/api/:id', (req, res) => {
    const { name, description } = req.body

    if (!name || !description) {
        res.json(0)
    }

    thingsDB.updateThing(req.params.id, name, description).then((result) => {
        res.json(result)
    }).catch((error) => {
        res.json(error)
    })
})

app.delete('/api/:id', (req, res) => {
    thingsDB.deleteThing(req.params.id).then((result) => {
        res.json(result)
    }).catch((error) => {
        res.json(error)
    })
})

app.listen(port, function () {

    console.log(`Example app listening at http://localhost:${port}`)

})