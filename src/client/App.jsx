//Importing hooks and React Router 
import { useState } from "react";
import { Routes, Route, Link} from 'react-router-dom'
import "./App.css";

//Importing Components
import Home from './components/Home'
import Navigations from './components/Navigations'
import Forecast from './components/Forecast'
import History from './components/History'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navigations />
      <Routes>
        <Route path = "/" element={<Home />}></Route>
        <Route path = "/forecast" element={<Forecast />}></Route>
        <Route path = "/history" element={<History />}></Route>
      </Routes>
    </>
  );
}

export default App;
