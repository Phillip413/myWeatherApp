import { useState, useEffect } from "react"

// third party api url
let weatherAPI_URL = "https://api.weatherapi.com/v1"

// FORECAST
function Forecast(props) {
  
  const [location, setLocation] = useState({})
  const [forecast, setForecast] = useState({})
  const [alerts, setAlerts] = useState({})
  const [searchCityName, setSearchCityName] = useState("")
  const [errorCheck, setErrorCheck] = useState(null)

  async function handleSubmit(event){
    event.preventDefault()
    
    try {
      let response = await fetch (`${weatherAPI_URL}/forecast.json?key=${props.apiKey}&q=${searchCityName}&days=3&aqi=yes&alerts=yes`)
      let json = await response.json()
      
      console.log(json)

    }catch(error){
      setErrorCheck(error)
      console.error(error.message)
    }
  }

  return (
    <>
    <div>
      {/* controlled form */}
      <form onSubmit={handleSubmit}>
        <label> Search City Name Here: </label>
        <input type="text" value = {searchCityName} onChange = {(event) => setSearchCityName(event.target.value)}/>

        <button type = "submit"> Go </button>
     
      </form>
    </div>

    {/* { location.name ? (
        <div>
          <h1>{location.name}</h1>
          <p>Forecast: {forecast.forecastday[0].astro}</p>

        </div>
      ):(
        <p>No Location Entered Yet!</p>
      )} */}

  </>
  )

}

export default Forecast;