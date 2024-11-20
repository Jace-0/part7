import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    // Only make the request if name is not null or empty
    if (name) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then(response => {
          setCountry(response.data)
          setError(null)
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            setError('not found')
          }
        })
    }
  }, [name]) // Add name as dependency

  return { country, error }
}

const Country = ({ searchResult }) => {
  const {country, error} = searchResult
  if (!country) {
    return null
  }

  if (error) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.name.common} </h3>
      <div>capital {country.capital[0]} </div>
      <div>population {country.population}</div> 
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`}/>  
    </div>
  )}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState(null)
  console.log(name)
  const searchResult = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country searchResult={searchResult} />
    </div>
  )
}

export default App