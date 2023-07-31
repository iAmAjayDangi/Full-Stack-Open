import { useState, useEffect } from 'react'
import axios from 'axios'

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
    // console.log('effect')
    axios.get('http://localhost:3001/persons').then(response => {
      // console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])

  // console.log(persons.length)

  const addPerson = (event) =>{
    event.preventDefault()
    const checkIfExists = persons.findIndex(person => person.name === newName)
    if(checkIfExists !== -1){
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterName={handleFilterName} filterPersons={filterPersons} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App