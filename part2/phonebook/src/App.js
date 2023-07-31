import { useState, useEffect } from 'react'

import personService from './services/personService'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [filterPersons, setFilterPersons] =useState([])

  useEffect(()=>{
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) =>{
    event.preventDefault()
    const checkIfExists = persons.findIndex(person => person.name === newName)
    if(checkIfExists !== -1){
      if(window.confirm(`${newName} is already added to phonebook, replace the older number with a new one?`)){
        const person = persons.find(person => person.name ===  newName)
        const changedPerson = {...person, number: newNumber}
        personService.update(person.id, changedPerson).then(changedPersonObject => {
          setPersons(persons.map(p => p.id !== person.id ? p : changedPersonObject))
          setNewName('')
          setNewNumber('')
        })
      }
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    personService.create(personObject).then(returnedObject => {
      setPersons(persons.concat(returnedObject))
      setNewName('')
      setNewNumber('')
    })
  }

  const handleNewName = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) =>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterName= (event) =>{
    if(event.target.value === ''){
      setFilterName('')
      setFilterPersons([])
      return
    }
    setFilterName(event.target.value)
    const filterPersonsList = persons.filter(person => person.name.toLowerCase().indexOf(event.target.value) !== -1)
    setFilterPersons(filterPersonsList)
  }

  const deletePerson = (id) =>{
    const person = persons.find(person => person.id === id)
    if(window.confirm(`Delete ${person.name}`)){
      personService.deleteGivenPerson(id).then(response => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterName={handleFilterName} filterPersons={filterPersons} deletePerson={deletePerson} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App