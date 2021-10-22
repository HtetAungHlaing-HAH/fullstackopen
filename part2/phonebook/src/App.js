import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'



//main App component
const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  //effect-hook function reference
  const hook = () => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const nameFound = persons.find(person => person.name === newPerson.name)
    if(nameFound)
    {
      window.alert(`${newName} is already added to phonebook`)
    }
    else
    {
      personService
        .add(newPerson)
        .then(newPersonObject => {
          setPersons(persons.concat(newPersonObject))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = id => {
    const deletedName = persons.find(person => person.id === id)
    if(window.confirm(`Delete ${deletedName.name} ?`))
    {
      personService.deletePer(id)
      .then(
        setPersons(persons.filter(person => person.id !== id))
      )
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
      <Persons persons={namesToShow} deleteHandler= {deletePerson}/>
    </div>
  )
}

export default App;