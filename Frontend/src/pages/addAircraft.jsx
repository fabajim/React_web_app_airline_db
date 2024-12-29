import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function addAircraft() {
    const [data, setCraftType] = useState([])
    const [serviced, setService] = useState('')
    const [hours, setHours] = useState('')
    const [type, setType] = useState('')
    
    useEffect(() => {
        axios.get('http://localhost:8081/IdAndModel')
        .then((res) => {
            setCraftType(res.data)
            console.log(res.data)
        })
        .catch((err) => console.log(err));
    }, [])
    

    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8081/aircraft', {serviced, hours, type})
        .then(res => {
            navigate('/aircraft');
            console.log(res);
        }).catch(err => console.log(err));
    }

  return (
    <>
    <h2 className='add-data-heading'>Add New Aircraft</h2>
    <div className='d-flex  justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h3>Fill in all data.</h3>
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
                    <label htmlFor=''>Last Service</label>
                    <input type="date" 
                    name='service' 
                    autoFocus 
                    className='form-control' 
                    required onChange={e => setService(e.target.value)} />
                </div>
                <div className="mb-2">
                    <label htmlFor=''>Hours Flown</label>
                    <input type="number" 
                    name='hours' 
                    className="form-control" 
                    required 
                    onChange={e => setHours(e.target.value)} />
                </div>
                <button type='submit' className='btn btn-success' >Save</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default addAircraft