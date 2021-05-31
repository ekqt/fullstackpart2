const Countries = ({ countries, filter, handleClick, setCountry }) => {
    let filtered = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
  
    if (!filter) {
      return (
        <p>Please make a search</p>
      )
    } else if (filtered.length > 10) {
      return (
        <p>Too many matches, specify another filter.</p>
      )
    } else if (filtered.length === 1) {
      setCountry(filtered[0].capital)
      return (
        <div>
          <br></br>
          <img src={filtered[0].flag} alt={filtered[0].name} width="200"></img>
          <h1>{filtered[0].name}</h1>
          <h4>{filtered[0].capital}</h4>
          <p>Population: {filtered[0].population}</p>
          <h4>Languages</h4>
          <ul>
            {filtered[0].languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
          </ul>
        </div>
      )
    } else {
      return (
        <ul>
          {filtered.map(country => <li key={country.alpha3Code}>{country.name}<button value={country.name} onClick={handleClick}>Show</button></li>)}
        </ul>
      )
    }
  }

export default Countries