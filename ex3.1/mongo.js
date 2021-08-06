const mongoose = require('mongoose')

if (process.argv.length > 5 || process.argv.length < 3){
    console.log("Please provide password, name, and number")
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.v2bpm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const contactSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length === 3){
    console.log("phonebook:")
    Contact.find({}).then(result => {
        result.forEach(contact => {
            console.log(contact.name, contact.number)
        })
        mongoose.connection.close()
    })
    
}

if (process.argv.length === 5){
    const name = process.argv[3]
    const number = process.argv[4]
    const contact = new Contact({
        name: name,
        number: number
    })
    
    contact.save().then(result => {
        console.log(`Added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}

