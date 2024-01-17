// importing hooks and React Router 
import { useState, useEffect } from "react";
import { Routes, Route, Link} from "react-router-dom"
import "./App.css";

// importing Components
import Navigations from "./components/Navigations"
import Home from "./components/Home"
import Forecast from "./components/Forecast"

// URL for my localhost
let myAPI = "http://localhost:3000/api/appKey"

// third party api url
// let weatherAPI_URL = "https://api.weatherapi.com/v1"

function App() {

  const [apiKey, setApiKey] = useState("")
  const [errorCheck, setErrorCheck] = useState(null)

  // maybe need to add useState variables here at top level (location, searchCityName?)
  const [location, setLocation] = useState({})
  const [searchCityName, setSearchCityName] = useState("")

  // useEffect to grab third party api access key from .env through backend
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

  // function to update location and searchCityName based on controlled form
  function updateLocation(newLocation) {
    setLocation(newLocation)
  }
  function updateSearchResults(newSearch) {
    setSearchCityName(newSearch)
  }

  return (
    <>
      <Navigations />

      <Routes>
        <Route path = "/" element={<Home apiKey={apiKey} location={location} updateLocation={updateLocation} searchCityName={searchCityName} updateSearchResults={updateSearchResults}/>}></Route>
        <Route path = "/forecast" element={<Forecast apiKey={apiKey} location={location} updateLocation={updateLocation} searchCityName={searchCityName} updateSearchResults={updateSearchResults}/>}></Route>
      </Routes>
    </>
  );
}

export default App;
