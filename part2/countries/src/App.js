import { useState, useEffect } from "react";
import React from 'react'
import axios from 'axios'
import Display from './components/Display'


//main App component
const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState({})

  //to store button-clicked country
  const [show, setShow] = useState([])

  //to store api_key
  const api_key = process.env.REACT_APP_API_KEY


  //to store countries to display
  const countriesToShow = search.length === 0
    ? show : countries.filter(country => country.name.common.match(new RegExp(search, "i")))

  const currentCountry = countriesToShow.length === 1
    ? countriesToShow[0].capital : ['Yangon']


  //this is effect-hook
  const countriesHook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }

  const weatherHook = () => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${currentCountry[0]}`)
      .then(response => {
        setWeather(response.data)
      })
  }


  useEffect(countriesHook, [])
  useEffect(weatherHook, [search])


  //to handle search box
  const handleSearch = (event) => {
    setSearch(event.target.value)
    setShow([])
  }

  //to handle show button
  const handleShow = (event) => {
    event.preventDefault()
    const showCountry = countries.filter(country => country.name.common === event.target.name)
    setShow(showCountry)
    setSearch('')
  }

  return (
    <div>
      <div>
        find countries<input value={search} onChange={handleSearch} />
      </div>
      <Display countries={countriesToShow} showHandler={handleShow} weather={weather} />
    </div>
  )
}

export default App;
