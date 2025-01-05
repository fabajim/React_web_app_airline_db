import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function updateAssignment() {
  const [data, setData] = useState([]);
  const [license, setLicense] = useState([])
  const [pilots, setPilots] = useState([]);
  const [airports, setAirports] = useState([]);
  let [pilot, setPilot] = useState([]);
  const [airport, setAirport] = useState('');

  const navigate = useNavigate();
  const {id} = useParams();
  const vals = id.split(":");
  const sn = vals[1];
  

  useEffect(() => {
    axios.get(`http://localhost:8081/assignmentDetails/${id}`)
    .then((res) => {
        //console.log(res.data);
        setData(res.data);
    })
    .catch((err) => {
        navigate('/assignments');
        alert("Server error: " + err.status + " - Assignment Details");
    })
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8081/filterPilot')
    .then((res) => {
        console.log(res.data);
        setPilots(res.data);
    })
    .catch((err) => {
        navigate('/assignments');
        alert("Server error: " + err.status + " - Pilots");
    });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8081/airports')
    .then((res) => {
        //console.log(res.data);
        setAirports(res.data);
    })
    .catch((err) => {
        navigate('/assignments');
        alert("Server error: " + err.status + " - Airports");
    });
  }, []);
  
  useEffect(() => {
    axios.get(`http://localhost:8081/aircraftLicense/${sn}`)
    .then((res) => {
        setLicense(res.data);
        console.log(res.data);
    })
    .catch((err) => {
        navigate(-1);
        alert("Server error: " + err.status + " - License");
    })
  }, []);

  function handleSubmit(event){
    event.preventDefault();
    if (pilot === "Current") pilot = data[0].pilotID;
    if (data[0].pilotID === null && (pilot === "NONE" || pilot === null)){
        alert('A pilot must be assigned before updating the airport!')
    } else if ((data[0].pilotID === null || pilot === "NONE" || pilot !==data[0].pilotID) && 
                airport != data[0].airportID) {
        alert(`A pilot must first be assigned before changing airports!
        Select the current airport: ${vals[2]}`)
    } else {
        validatePilot();
    }
  }

  function validatePilot() {
    if (pilot === "NONE") {
        pilot = null;
    } else if(pilot != data[0].pilotID) {
        let pilotInfo = pilot.split(',');
        if (pilotInfo[1] < license[0].licenseID){
            alert("Pilot is not licensed to fly this aircraft!")
            return
        }
        pilot = pilotInfo[0];
    }
    handleUpdate();
  }

  async function handleUpdate() {
    let aircraft = data[0].aircraftID;
    let post_response;
    let put_response;
    try {
        post_response = await axios.post(`http://localhost:8081/assignmentDetails`, { aircraft, pilot, airport });
        put_response = await axios.put(`http://localhost:8081/assignmentDetails/${vals[0]}`);

        console.log(post_response);
        console.log(put_response);
        navigate('/currentAssignments');
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <>
    <h2 className='add-data-heading'>Update Assignment: {vals[0]} Aircraft: {vals[1]} Current Airport: {vals[2]}</h2>
    <div className='d-flex  justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h3>Fill in all data.</h3>
                <div className="mb-2">
                    <div><label>Select Pilot</label></div>
                    <select onChange={e => setPilot(e.target.value)} required>
                    <option value="">Pilot</option>
                    <option value="NONE">NONE</option>
                    <option value="Current">Current Pilot</option>
                    {pilots.map((data) => { return (
                        <option key={data.pilotID} value={[data.pilotID, data.license]}>
                            {data.fname} {data.lname}
                        </option>
                    )})}
                </select>
                </div>
                <div className="mb-2">
                    <div><label>Location</label></div>
                    <select onChange={e => setAirport(e.target.value)} required>
                    <option value="">Airport</option>
                    {airports.map((data) => { return (
                        <option key={data.airportID} value={data.airportID}>
                            {data.cityCode} 
                        </option>
                    )})}
                </select>
                </div>
                <button type='submit' className='btn btn-success' >Save</button>
                <Link to='/assignments' className='btn btn-danger'>Cancel</Link>
            </form>
        </div>
    </div>
    </>
  )
}

export default updateAssignment