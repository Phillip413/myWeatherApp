import { useState } from "react"
import { Button, Container, Row, Col } from 'react-bootstrap';

// third party api url
let weatherAPI_URL = "https://api.weatherapi.com/v1"

// TODAY
function Home (props) {

  const [current, setCurrent] = useState({})
  const [conditionText, setConditionText] = useState("")
  const [errorCheck, setErrorCheck] = useState(null)

  async function handleSubmit(event){
    event.preventDefault()
    
    try {
      let response = await fetch (`${weatherAPI_URL}/current.json?key=${props.apiKey}&q=${props.searchCityName}&aqi=no`)
      let json = await response.json()

      let response2 = await fetch (`${weatherAPI_URL}/forecast.json?key=${props.apiKey}&q=${props.searchCityName}&days=3&aqi=yes&alerts=yes`)
      let json2 = await response2.json()
      props.updateForecast(json2.forecast.forecastday)

      setCurrent(json.current)
      
      // use updateLocation() from parent component
      props.updateLocation(json.location)

      setConditionText(json.current.condition.text)
      
      console.log(json)

    }catch(error){
      setErrorCheck(error)
      console.error(error.message)
    }
  }

  return (
    <>
      <Container>
        <div>
          {/* controlled form */}
          <form onSubmit={handleSubmit}>
            <label> Search City Name Here: </label>
            <input type="text" value = {props.searchCityName} onChange = {(event) => props.updateSearchResults(event.target.value)}/>

            {/* using Button class from imported react-bootstrap */}
            <Button type = "submit"> Go </Button>
        
          </form>
        </div>
      </Container>
      
      <Container>
        { props.location.name ? (

          <div className="home_content">
            
            <Row><h1>{props.location.name}</h1></Row>
            
            <Row>
              <Col><p>temperature: {current.temp_f} °F</p></Col>
              <Col><p>temperature: {current.temp_c} °C</p></Col>
              <Col><p>humidity: {current.humidity}</p></Col>
              <Col><p>is day: {current.is_day}</p></Col>
              <Col><p>precip_in: {current.precip_in}</p></Col>
              <Col><p>condition: {conditionText}</p></Col>
            </Row>

          </div>
        ):(
          <p>No Location Entered Yet!</p>
        )}
      </Container>
    </>
  )
 
}

export default Home;