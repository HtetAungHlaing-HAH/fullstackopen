import { useState, useEffect } from "react";
import React from 'react'
import axios from 'axios'


const Display = (props) => {
  const filteredCountries = [...props.countries]
  if(filteredCountries.length > 10)
  {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  else if(filteredCountries.length === 1)
  { 
    const oneCountry = filteredCountries[0]
    const languages = Object.values(oneCountry.languages)
    return (
      <>
        <h2>
          {oneCountry.name.common}
        </h2>
        <div>
          capital {oneCountry.capital}
        </div>
        <div>
          population {oneCountry.population}
        </div>
        <h3>
          languages
        </h3>
        <ul>
          {languages.map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={oneCountry.flags.png} alt={oneCountry.name.common} style={{width:'150px', height: '150px'}} />
      </>
    )
  }
  else if (filteredCountries.length <= 10)
  {
    return (
      <div>
        {filteredCountries.map(filter => <div key={filter.name.common}>{filter.name.common}</div>)}
      </div>
    )
  }
  return (
    <div>

    </div>
  )  
}


//main App component
const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ search, setSearch ] = useState('')

  const countriesToShow = search.length === 0
  ? [] : countries.filter(country => country.name.common.match(new RegExp(search, "i")))
  

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  
  useEffect(hook, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return(
    <div>
      <div>
        find countries<input value={search} onChange={handleSearch}/>
      </div>
      <Display countries={countriesToShow} />
    </div>
  )
}

export default App;
