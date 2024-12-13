import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

// import components, styles, media
import Navigation from './components/Navigation';
import './App.css';

import Home from './pages/home';
import PilotsPage from './pages/pilots';
import AircraftPage from './pages/aircraft';
import AddPilotPage from './pages/addPilot';

function App() {
  //const [data, setData] = useState([])

  return (
    <>
      <BrowserRouter>
      <header>
        <h1>
          Airline DB
        </h1>
      </header>
      <Navigation />
      <main>
        <section>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/pilots" element={<PilotsPage/>}/>
            <Route path="/addPilot" element={<AddPilotPage/>}/>
            <Route path="/aircraft" element={<AircraftPage/>}/>
          </Routes>
        </section>
      </main>
      </BrowserRouter>
    </>
  )
}

export default App
