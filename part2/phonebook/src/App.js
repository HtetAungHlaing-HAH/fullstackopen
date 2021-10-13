import React, { useState } from 'react'
import Persons from './components/Persons'

//main App component
const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  //to store value in input element
  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  //to add new name in persons
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Persons key={person.name} name={person.name} />)}
    </div>
  )
}

export default App