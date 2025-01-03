import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

// import components, styles, media
import Navigation from './components/Navigation';
import './App.css';

import Home from './pages/home';
import PilotsPage from './pages/pilots';
import AddPilotPage from './pages/addPilot';
import UpdatePilotPage from './pages/updatePilot';
import AircraftPage from './pages/aircraft';
import AddAircraftPage from './pages/addAircraft';
import GetType from './pages/getType';
import UpdateAircraft from './pages/updateAircraft';
import AircraftTypePage from './pages/aircraftType';
import AddAircraftTypePage from './pages/addType';
import LicenseDetailsPage from './pages/licenseDetails';
import AirportsPage from './pages/airports';
import AssignmentDetailsPage from './pages/assignmentDetails';
import UpdateAssignmentPage from './pages/updateAssignment';
import PastAssignmentsPage from './pages/pastAssignments';
import CurrentAssignmentsPage from './pages/currentAssignments';

function App() {

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
            <Route path="/updatePilot/:id" element={<UpdatePilotPage/>}/>
            <Route path="/aircraft" element={<AircraftPage/>}/>
            <Route path="/addAircraft" element={<AddAircraftPage/>} />
            <Route path="/getType/:id" element={<GetType/>} />
            <Route path="/updateAircraft/:id" element={<UpdateAircraft/>} />
            <Route path="/aircraftType" element={<AircraftTypePage/>} />
            <Route path="/addType" element={<AddAircraftTypePage/>} />
            <Route path="/viewLicense/:id" element={<LicenseDetailsPage/>} />
            <Route path="/airports" element={<AirportsPage/>} />
            <Route path="/assignments" element={<AssignmentDetailsPage/>} />
            <Route path="/updateAssignment/:id" element={<UpdateAssignmentPage/>} />
            <Route path="/currentAssignments" element={<CurrentAssignmentsPage/>} />
            <Route path="/pastAssignments" element={<PastAssignmentsPage/>} />
          </Routes>
        </section>
      </main>
      </BrowserRouter>
    </>
  )
}

export default App
