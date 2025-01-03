import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function updateAssignment() {
  const [data, setData] = useState([]);
  const [pilots, setPilots] = useState([]);
  const [airports, setAirports] = useState([]);
  let [pilot, setPilot] = useState('');
  const [airport, setAirport] = useState('');

  const navigate = useNavigate();
  const {id} = useParams();
  const vals = id.split(":");

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

  function handleSubmit(event){
    event.preventDefault();
    if (data[0].pilotID === null && pilot === "NONE"){
        alert('A pilot must be assigned before updating the airport!')
    } else if (data[0].pilotID === null && airport != data[0].airportID) {
        alert(`A pilot must first be assigned before changing airports!
        Select the current airport: ${vals[2]}`)
    } else {
        handleUpdate();
    }
  }

  async function handleUpdate() {
    if (pilot === "NONE") pilot = null;
    let aircraft = data[0].aircraftID;
    let post_response;
    let put_response;
    try {
        post_response = await axios.post(`http://localhost:8081/assignmentDetails`, { aircraft, pilot, airport });
        put_response = await axios.put(`http://localhost:8081/assignmentDetails/${vals[0]}`);

        console.log(post_response);
        console.log(put_response);
        navigate('/assignments');
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
                    {pilots.map((data) => { return (
                        <option key={data.pilotID} value={data.pilotID}>
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
            </form>
        </div>
    </div>
    </>
  )
}

export default updateAssignment