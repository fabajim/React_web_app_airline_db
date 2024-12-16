import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function addAircraft() {
    const [serviced, setService] = useState('')
    const [hours, setHours] = useState('')
    const [type, setType] = useState('')

    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8081/addAircraft', {serviced, hours, type})
        .then(res => {
            navigate('/aircraft');
            console.log(res);
        }).catch(err => console.log(err));
    }

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Add New Aircraft</h2>
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
                <div className="mb-2">
                    <label htmlFor="">Aircraft Type</label>
                    <input type="number"
                    name="type" 
                    className="form-control"
                    required
                    onChange={e => setType(e.target.value)} />
                </div>
                <button type='submit' className='btn btn-success' >Save</button>
            </form>
        </div>
    </div>
  )
}

export default addAircraft