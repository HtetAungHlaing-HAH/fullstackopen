import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from 'axios'



//main App component
const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  //effect-hook function reference
  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  //effect-hook
  useEffect(hook, [])

  console.log('render', persons.length, 'persons')

  //to store filtered names by search field
  const namesToShow = search.length === 0
  ? persons : persons.filter(person => person.name.match(new RegExp(search, "i")))


  //to store new name in input element
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  //to store new number in input element
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  //to store search name in input element
  const handleSearchName = (event) => {
    setSearch(event.target.value)
  }

  //to add new name in persons
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id : persons.length +1
    }
    const nameFound = persons.find(person => person.name === nameObject.name)
    if(nameFound)
    {
      window.alert(`${newName} is already added to phonebook`)
    }
    else
    {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text='filter shown with' value={search} filterHandler={handleSearchName}/>
      <h3>add a new</h3>
      <PersonForm 
        name={newName} nameHandler={handleNewName}
        number={newNumber} numberHandler={handleNewNumber}
        addHandler={addName}
      />
      <h3>Numbers</h3>
      <Persons persons={namesToShow} />
    </div>
  )
}

export default App;