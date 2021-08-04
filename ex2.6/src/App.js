import React, { useEffect, useState } from 'react'
import personService from './services/persons'
import './index.css'

const ShowPeople = ( {person, deleteInfo} ) => {
  return(
    <div>
      {person.name} {person.number} <button onClick={() => 
        deleteInfo(person)}>delete</button>
    </div>
  )
  
}

const Persons = ( {persons, deleteInfo} ) => {
  return(
    <div>
      {persons.map(person => <ShowPeople key={person.name} person={person} deleteInfo={deleteInfo}/>)}
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="info">
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ infoMessage, setInfoMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  const addInfo = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }  
    
    const duplicateIndex = persons.findIndex(person => person.name === newName)
    const duplicateId = duplicateIndex + 1 
    
    if (duplicateIndex !== -1){
    
      if (window.confirm(`Do you want to update the information for ${newName}?`)){
        personService
          .update(duplicateId, nameObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== duplicateId ? person : returnedPerson))
            })

      }
    } else {
      setPersons(persons.concat(nameObject))
      setInfoMessage(`Added ${nameObject.name}`)
      setTimeout(() => {
        setInfoMessage(null)
      }, 3000)

      personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
      
    
    }
    
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value)))
  }

  const deleteInfo = (person) => {
    console.log("person", person)
    if (window.confirm(`Are you sure you want to delete ${person.name} from contacts?`)){
      
      personService
      .remove(person.id)
      .then(setPersons(persons.filter(pers => pers.id !== person.id)))
      
        
    }
  }

  
  return (  
    <div>
      <h2>Phonebook</h2>
      <Notification message={infoMessage}/>
      filter shown with <input 
      onChange={handleFilter}/>
      
      <h2>Add a new contact</h2>
      <form onSubmit={addInfo}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button> 
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <Persons persons={persons} deleteInfo={deleteInfo} />
      </div>
    </div>
  )
}

export default App