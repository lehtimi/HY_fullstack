require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('build'))
app.use(cors())


/*let people = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]*/

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.get('/info', (request, response) => {
    console.log("Getting info")
    Person.countDocuments({}).then(count => {
        response.send(`Phonebook has info for ${count} people. <br/> ${Date()}`)
    })
})


const generateId = () => {
    const id = Math.round(Math.random() * 30)
    return id
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)
    /*
    if (!body.name || !body.number){
        return response.status(400).json({
            error: "contact information is missing"
        })
    }

    if (people.find(person => person.name === body.name)){
        return response.status(400).json({
            error: "this contact already exists"
        })
    }
    */
    const person = new Person ({
        id: generateId(),
        name: body.name,
        number: body.number
    })
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    people = people.filter(person => person.id !== id)

    response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

