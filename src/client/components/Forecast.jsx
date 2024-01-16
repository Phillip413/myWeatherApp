import { useState, useEffect } from "react"

// third party api url
let weatherAPI_URL = "https://api.weatherapi.com/v1"

// FORECAST
function Forecast(props) {
  
  const [location, setLocation] = useState({})

  const [forecast, setForecast] = useState({})
  const [forecastConditionText, setForecastConditionText] = useState({})
  const [forecastConditionIcon, setForecastConditionIcon] = useState({})

  const [alerts, setAlerts] = useState({})
  const [searchCityName, setSearchCityName] = useState("")
  const [errorCheck, setErrorCheck] = useState(null)

  async function handleSubmit(event){
    event.preventDefault()
    
    try {
      let response = await fetch (`${weatherAPI_URL}/forecast.json?key=${props.apiKey}&q=${searchCityName}&days=3&aqi=yes&alerts=yes`)
      let json = await response.json()
      
      setLocation(json.location)

      // this saves the forecast array of 3 days
      setForecast(json.forecast.forecastday)
      
      // this saves the forecast conditionText into an array using the map method
      let conditionTextArray = json.forecast.forecastday.map((day)=> {
        return day.day.condition.text;
      })

      // this saves the forecast conditionIcon into an array using the map method ... note: seems image urls from third party api does not work
      let conditionIconArray = json.forecast.forecastday.map((day)=> {
        return day.day.condition.icon;
      })
      
      console.log("conditionTextArray:", conditionTextArray)
      setForecastConditionText(conditionTextArray)
      setForecastConditionIcon(conditionIconArray)

      setAlerts(json.alerts)
      
      console.log("json", json)
      console.log("json.forecast.forecastday: ", json.forecast.forecastday)

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

    { location.name ? (
      <div className="forecast_content">
        <h1>{location.name}</h1>
        
        <ul>
          {forecast.map((day, index)=>(

            <li key={day?.date}>
              <h2>{day.date}</h2>
              <p>max temperature: {day.day.maxtemp_f} °F & {day.day.maxtemp_c} °C</p>
              <p>min temperature: {day.day.mintemp_f} °F & {day.day.mintemp_c} °C</p>
              <p>total precipitation: {day.day.totalprecip_in} in</p>
              <p>condition: {forecastConditionText[index]}</p>
              <img src= {`"${forecastConditionIcon[index]}"`}/>
            </li>

          ))}
        </ul>

      </div>
    ):(
        <p>No Location Entered Yet!</p>
    )}

  </>
  )

}

export default Forecast;