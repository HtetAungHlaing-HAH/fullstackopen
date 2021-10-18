import { useState, useEffect } from "react";
import React from 'react'
import axios from 'axios'
import Display from './components/Display'


//main App component
const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ search, setSearch ] = useState('')

  //to store button-clicked country
  const [ show, setShow ] = useState([])

  //to store countries to display
  const countriesToShow = search.length === 0
  ? show : countries.filter(country => country.name.common.match(new RegExp(search, "i")))

  
  //this is effect-hook
  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  
  useEffect(hook, [])

  //to handle search box
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  //to handle show button
  const handleShow = (event) => {
    event.preventDefault()
    const showCountry = countries.filter(country => country.name.common === event.target.name)
    setShow(showCountry)
    setSearch('')
  }

  return(
    <div>
      <div>
        find countries<input value={search} onChange={handleSearch}/>
      </div>
      <Display countries={countriesToShow} showHandler={handleShow}/>
    </div>
  )
}

export default App;
