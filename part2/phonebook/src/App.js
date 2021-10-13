import React, { useState } from 'react'
import Persons from './components/Persons'

//main App component
const App = () => {
  const [ persons, setPersons ] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  //to store new name in input element
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  //to store new number in input element
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  //to add new name in persons
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
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
      {persons.map(person => <Persons key={person.name} person={person} />)}
    </div>
  )
}

export default App