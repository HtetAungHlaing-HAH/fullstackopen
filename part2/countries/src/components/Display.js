import React from 'react'

//SingleCountry Component
const SingleCountry = ({singleCountry}) => {
    const languages = Object.values(singleCountry.languages)
    return (
        <div>
          <h2>
            {singleCountry.name.common}
          </h2>
          <div>
            capital {singleCountry.capital}
          </div>
          <div>
            population {singleCountry.population}
          </div>
          <h3>
            languages
          </h3>
          <ul>
            {languages.map(language => <li key={language}>{language}</li>)}
          </ul>
          <img src={singleCountry.flags.png} alt={singleCountry.name.common} style={{border:'1px solid'}} />
        </div>
    )
}

//Display Component
const Display = (props) => {
    const filteredCountries = [...props.countries]
    if(filteredCountries.length > 10)
    { //when number of matched countries is > 10
      return (
        <div>
          Too many matches, specify another filter
        </div>
      )
    }
    else if(filteredCountries.length === 1)
    { //when number of matched countries is 1
      const oneCountry = filteredCountries[0]
      return (
        <SingleCountry singleCountry={oneCountry} />
      )
    }
    else if (filteredCountries.length <= 10)
    { //when number of matched countries is <= 10
      return (
        <div>
          {filteredCountries.map(filter => { return (
            <div key={filter.name.common}>
                {filter.name.common} <button name={filter.name.common} type="submit" value="show" onClick={props.showHandler}>show</button>
            </div>
          )}
          )}
        </div>
      )
    }
    return (
      <div>
  
      </div>
    )  
  }

export default Display;