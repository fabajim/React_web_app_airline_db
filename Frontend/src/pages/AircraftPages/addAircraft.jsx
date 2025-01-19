import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/*
    Add aircraft page
    lets user fill a form to add a new aircraft
*/

function addAircraft() {
    const [data, setCraftType] = useState([]);
    const [airports, setAirports] = useState([]);
    const [serial, setSerial] = useState('');
    const [serviced, setService] = useState('');
    const [hours, setHours] = useState('');
    const [type, setType] = useState('');
    const [airport, setAirport] = useState('');
    
    const navigate = useNavigate();

    /*
        Get api to get the aircraft to use type id and make/model
    */
    useEffect(() => {
        axios.get('http://localhost:8081/aircraftType')
        .then((res) => {
            setCraftType(res.data);
        })
        .catch((err) => {
            console.log(err);
            navigate('/aircraft');
            alert("Server error: " + err.status + " - aircraftTypes");
        });
    }, [])

    /**
        Get api to get the airports to set
        the current location of the aircraft
     */
    useEffect(() => {
        axios.get('http://localhost:8081/airports')
        .then((res) => {
            setAirports(res.data);
        })
        .catch((err) => {
            console.log(err);
            navigate('/aircraft');
            alert("Server error: " + err.status + " - airports");
        });
    }, [])

    /*
        Handles save button click
        uses post api to add new row to aircraft table
    */
    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8081/aircraft', {serial, serviced, hours, type, airport})
        .then(res => {
            navigate('/aircraft');
            console.log(res);
        }).catch(err => {
            console.log(err);
            alert(`Server Error: ${err.status}`);
        });
    }

  return (
    <>
    <h2 className='add-data-heading'>Add New Aircraft</h2>
    <div className='d-flex  justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h3>Fill in all data.</h3>
                <div>Select aircraft type or 
                <Link to="/addType"> add a new type</Link>
                </div>
                <div className="mb-2">
                    <select onChange={e => setType(e.target.value)} required>
                    <option value="">Aircraft Type</option>
                    {data.map((data) => { return (
                        <option key={data.aircraftTypeID} value={data.aircraftTypeID}>
                            {data.model}
                        </option>
                    )})}
                </select>
                </div>
                <div className="mb-2">
                    <label htmlFor=''>Serial Number</label>
                    <input 
                        type="text" 
                        name='serial' 
                        className="form-control" 
                        required 
                        onChange={e => setSerial(e.target.value)} />
                </div>
                <div className="mb-2">
                    <label htmlFor=''>Last Service</label>
                    <input 
                        type="date" 
                        name='service' 
                        autoFocus 
                        className='form-control' 
                        required onChange={e => setService(e.target.value)} />
                </div>
                <div className="mb-2">
                    <label htmlFor=''>Hours Flown</label>
                    <input 
                        type="number" 
                        name='hours' 
                        className="form-control" 
                        required 
                        onChange={e => setHours(e.target.value)} />
                </div>
                <div className="mb-2">
                    <div><label>Current Location</label></div>
                    <select onChange={e => setAirport(e.target.value)} required>
                    <option value="">Select an Airport</option>
                    {airports.map((d) => { return (
                        <option key={d.airportID} value={d.airportID}>
                            {d.cityCode}
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

export default addAircraft