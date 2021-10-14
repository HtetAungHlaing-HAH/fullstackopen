import React, { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'



//main App component
const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Arto Something', number: '3233234', id: 2 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 3 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 4 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 5 }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')

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