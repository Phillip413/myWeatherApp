// importing hooks and React Router 
import { useState, useEffect } from "react";
import { Routes, Route, Link} from 'react-router-dom'
import "./App.css";

// importing Components
import Home from './components/Home'
import Navigations from './components/Navigations'
import Forecast from './components/Forecast'
import History from './components/History'

// URL for my localhost
let myAPI = "http://localhost:3000/api/appKey"

function App() {
  
  const [apiKey, setApiKey] = useState("")
  const [errorCheck, setErrorCheck] = useState(null)

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

  return (
    <>
      <Navigations />
      <Routes>
        <Route path = "/" element={<Home apiKey={apiKey}/>}></Route>
        <Route path = "/forecast" element={<Forecast apiKey={apiKey}/>}></Route>
        <Route path = "/history" element={<History apiKey={apiKey}/>}></Route>
      </Routes>
    </>
  );
}

export default App;
