import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

let myAPI = "http://localhost:3000/api/appKey"
let weatherAPI_URL = "https://api.weatherapi.com/v1"

//TODAY
function Home () {

  const [current, setCurrent] = useState({})
  const [location, setLocation] = useState({})
  const [searchCityName, setSearchCityName] = useState("")
  const [conditionText, setConditionText] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [errorCheck, setErrorCheck] = useState(null)
  
  // useEffect to grab api access key from .env through backend
  useEffect(() => {
    fetchMyApiKey()
  }, []);
  
  async function fetchMyApiKey() {
    try {
      const response = await fetch(`${myAPI}`)
      const json = await response.json()
      setApiKey(json.data.key)
    } catch (error) {
      setErrorCheck(error.message);
    }
  }

  async function handleSubmit(event){
    event.preventDefault()
    
    try{
      let response = await fetch (`${weatherAPI_URL}/current.json?key=${(apiKey)}&q=${searchCityName}&aqi=no`)
      let json = await response.json()
      
      setCurrent(json.current)
      setLocation(json.location)
      setConditionText(json.current.condition.text)

      // console.log("json: ",json)
      // console.log("json.current: ",json.current)
      // console.log("json.location: ",json.location)

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