import React, { useEffect, useState } from 'react'

import Filter from './filter'
import PersonForm from './personForm'
import Person from './person'
import personService from './services/persons'
import Notification from './notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [type, setType] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  // Remember: We create a new object for the note but omit the id property, since it's better to let the server generate ids for our resources!

  const addName = (event) => {
    event.preventDefault()
    const p = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if (!p) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: Math.floor(Math.random() * (199999 - 100000) + 100000)
      }
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          setType('notification is-primary is-light')
          setMessage(
            `Added '${response.name}'`
          )
          setTimeout(() => {
            setMessage(null)
          }, 2500)
        })
    } else if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const url = `http://localhost:3001/persons/${p.id}`
      const personObject = {
        name: newName,
        number: newNumber,
        id: Math.floor(Math.random() * (199999 - 100000) + 100000)
      }
      personService
        .update(url, personObject)
        .then(response => {
          setPersons(persons.map(person => person.id !== p.id ? person : response))
          setNewName('')
          setNewNumber('')
          setType('notification is-primary is-light')
          setMessage(
            `Updated '${response.name}'`
          )
          setTimeout(() => {
            setMessage(null)
          }, 2500)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = !filter ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const removePersonOf = p => {
    const url = `http://localhost:3001/persons/${p.id}`
    if (window.confirm(`Would you like to remove ${p.name}?`)) {
      personService
        .destroy(url)
        .then(() => {
          setPersons(persons.filter(person => person.id !== p.id))
          setType('notification is-primary is-light')
          setMessage(
            `Deleted '${p.name}'`
          )
          setTimeout(() => {
            setMessage(null)
          }, 2500)
        })
        .catch(() => {
          setType('notification is-danger is-light')
          setMessage(
            `Contact '${p.name}' was already removed from server`
          )
          setTimeout(() => {
            setMessage(null)
          }, 2500)
        })
    }
  }

  return (
    <div className="columns py-5 px-4">
      <div className="column is-6 is-offset-3">
        <h1>React Phonebook</h1>

        <Notification type={type} message={message} />

        <Filter filter={filter} handleFilterChange={handleFilterChange} />

        <h2>Add a new</h2>

        <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addName={addName} />

        <h2>Numbers</h2>
          {
            personsToShow.map((person, i) =>
              <Person person={person} key={i} removePerson={() => removePersonOf(person)} />
            )
          }

      </div>
    </div>
  )
}

export default App