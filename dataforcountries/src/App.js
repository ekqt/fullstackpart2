import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Components
import Filter from './filter'
import Countries from './countries'

const App = () => {

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState('')
  const [filter, setFilter] = useState('')
  const [showFilter, setShowFilter] = useState('')

  const countryData = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(countryData, [])

  const weatherData = () => {
      axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WS_APIKEY}&query=${country}`)
      .then(response => {
        setWeather(response.data)
        console.log(response.data)
      })
  }

  useEffect(weatherData, [country])

  const handleFilterChange = (event) => {
    if (!setShowFilter) {
      setFilter(showFilter)
    } else {
      setFilter(event.target.value)
    }
  }

  const handleClick = (event) => {
    setFilter(event.target.value)
  }

  if (!country) {
    return (
      <div>
        <Filter filter={filter} handleFilterChange={handleFilterChange} text="Find Countries" />
        <Countries countries={countries} filter={filter} handleClick={handleClick} setCountry={setCountry} />
      </div>
    )
  } else {
    return (
      <div>
        <Filter filter={filter} handleFilterChange={handleFilterChange} text="Find Countries" />
        <Countries countries={countries} filter={filter} handleClick={handleClick} setCountry={setCountry} />
        <h4>Weather in {country}</h4>
        <p><strong>Temperature</strong>: {weather.current.temperature} Celcius</p>
        <img src={weather.current.weather_icons} alt="Weather Icon"></img>
        <p><strong>Wind</strong>: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
      </div>
    )
  }


}

export default App