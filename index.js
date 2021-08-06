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

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
        response.json(person)
        })
        .catch(error => next(error))
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

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    console.log(body)

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))

})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(400).send( {error: 'unknown endpoint'} )
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

