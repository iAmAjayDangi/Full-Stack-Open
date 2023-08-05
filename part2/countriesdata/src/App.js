import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () =>{

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('')  
  const [renderWeather, setRenderWeather] = useState('<div></div>')

  useEffect(()=>{
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then(response => {
      console.log(response.data)
      setCountries(response.data)
    })
  }, [])

  const renderWeatherData =  (countryWeather) =>{

    const api_key = process.env.REACT_APP_API_KEY

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${countryWeather}&appid=${api_key}`).then(response =>{
      const temp = response.data.main.temp
      const wind = response.data.wind.speed
      const imgSrc = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      setRenderWeather(`<div><p>temperature ${temp} Celsius</p><img src = ${imgSrc} ></img><p>wind ${wind} m/s</p></div>`)
    })
  }


  const outputCountries = () =>{
    if(country === ''){
      return (<div></div>)
    }

    console.log(country)
    const outputCountriesList = countries.filter(c => c.name.common.toLowerCase().indexOf(country.toLowerCase()) !== -1)
    console.log(outputCountriesList)

    if(outputCountriesList.length === 1){
      renderWeatherData(outputCountriesList[0].name.common,1)
      return(
        <div>
          <h2>{outputCountriesList[0].name.common}</h2>
          <p>capital {outputCountriesList[0].capital}</p>
          <p>area {outputCountriesList[0].area}</p>
          <h3>languages</h3>
          <ul>
            {Object.keys(outputCountriesList[0].languages).map((key, index) => <li key={index}>{outputCountriesList[0].languages[key]}</li>)}
          </ul>
          <img src={outputCountriesList[0].flags.png} height={'200px'} width={'200px'} alt={'flag'}></img>
        </div>
      )
    }

    else if(outputCountriesList.length <= 10){
      if(renderWeather !== '<div></div>'){
        setRenderWeather('<div></div>')
      }
      return outputCountriesList.map(c => <div key={c.name.common}><span>{c.name.common}</span><button onClick={() => setCountry(c.name.common)}>show</button></div>)
    }

    else{
      if(renderWeather !== '<div></div>'){
        setRenderWeather('<div></div>')
      }
      return <p>Too many matches, specify another filter</p>
    }

  }

  return(
    <div>
      find countries <input value={country} onChange={(event) => setCountry(event.target.value)}></input>
      {outputCountries()}
      <div dangerouslySetInnerHTML={{__html: renderWeather}}></div>
    </div>
  )

}

export default App