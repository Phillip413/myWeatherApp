import { useState, useEffect } from "react"

// third party api url
let weatherAPI_URL = "https://api.weatherapi.com/v1"

// TODAY
function Home (props) {

  const [current, setCurrent] = useState({})
  const [location, setLocation] = useState({})
  const [conditionText, setConditionText] = useState("")
  const [searchCityName, setSearchCityName] = useState("")
  const [errorCheck, setErrorCheck] = useState(null)

  async function handleSubmit(event){
    event.preventDefault()
    
    try {
      let response = await fetch (`${weatherAPI_URL}/current.json?key=${props.apiKey}&q=${searchCityName}&aqi=no`)
      let json = await response.json()
      
      setCurrent(json.current)
      setLocation(json.location)
      setConditionText(json.current.condition.text)
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
      
      { location.name ? (
        <div>
          <h1>{location.name}</h1>
          <p>temperature: {current.temp_f} °F</p>
          <p>temperature: {current.temp_c} °C</p>
          <p>condition: {conditionText}</p>
          <p>humidity: {current.humidity}</p>
          <p>is day: {current.is_day}</p>
          <p>precip_in: {current.precip_in}</p>
        </div>
      ):(
        <p>No Location Entered Yet!</p>
      )}

    </>
  )
 
}

export default Home;