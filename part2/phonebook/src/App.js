import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'


//main App component
const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ noti, setNoti ] = useState(null)
  const [ error, setError ] = useState(false)

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
    if(newPerson.name === '' || newPerson.number === '')
    {
      window.alert("Please enter name and number to add to phonebook!")
    }
    else
    {
      const nameFound = persons.find(person => person.name === newPerson.name)
      if(nameFound)
      {
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
        {
          personService
            .replace(newPerson ,nameFound.id)
            .then(updatedObject => {
              setPersons(persons.map(person => person.id !== nameFound.id ? person : updatedObject))
              setNewName('')
              setNewNumber('')
              setNoti(`Updated ${newPerson.name}'s Number`)
              setTimeout(() => {
                setNoti(null)
              }, 5000)
            })
            .catch(error => {
              if(error.response.status === 400)
              {
                setError(true)
                setNoti(error.response.data.error)
                setTimeout(() => {
                  setError(false)
                  setNoti(null)
                }, 5000)
              }
              else if(error.response.status === 404)
              {
                setError(true)
                setNoti(`Information of ${newPerson.name} has already been removed from server`)
                setTimeout(() => {
                  setError(false)
                  setNoti(null)
                }, 5000)
                setPersons(persons.filter(person => person.id !== nameFound.id))
                setNewName('')
                setNewNumber('')  
                }
            }
            )
        }
      }
      else
      {
        personService
          .add(newPerson)
          .then(newPersonObject => {
            setPersons(persons.concat(newPersonObject))
            setNewName('')
            setNewNumber('')
            setNoti(`Added ${newPerson.name}`)
              setTimeout(() => {
                setNoti(null)
              }, 5000)
          })
          .catch(error => {
            setError(true)
            setNoti(error.response.data.error)
            setTimeout(() => {
              setError(false)
              setNoti(null)
            }, 5000)
            console.log(error.response.data)
          })
      }  
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
      <Notification message={noti} error={error}/>
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