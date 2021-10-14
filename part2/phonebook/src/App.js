import React, { useState } from 'react'
import Persons from './components/Persons'

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
  const namesToShow = search.length === 0
  ? persons : persons.filter(person => person.name.search(new RegExp(search, "i")) === 0)

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
      <div>
        filter shown with<input value={search} onChange={handleSearchName} />
      </div>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          number: <input  value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {namesToShow.map(person => <Persons key={person.id} person={person} />)}
    </div>
  )
}

export default App