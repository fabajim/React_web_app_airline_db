import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function addAirport() {
    const [city, setCity] = useState('');
    const [code, setCode] = useState('');
    const [hub, setHub] = useState('1');

    const navigate = useNavigate('');

    /*
        POST api call to add a new airport
    */
    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/airports', {city, code, hub})
        .then((res) => {
            alert('Airport Added');
            navigate('/airports');
        })
        .catch((err) => {
            alert('Error: ' + err.status );
            navigate('/airports');
        });
    }

  return (
    <>
        <h2 className='add-data-heading'>Add New Airport</h2>
        <div className='d-flex  justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h3>Fill in all data.</h3>
                    <div className="mb-2">
                        <label htmlFor=''>City</label>
                        <input 
                            autoFocus 
                            type="text" 
                            name='city' 
                            className='form-control' 
                            required 
                            onChange={e => setCity(e.target.value)} 
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor=''>City Code</label>
                        <input 
                            type="text" 
                            name='code'  
                            className='form-control'
                            placeholder='E.G: LAX' 
                            required 
                            onChange={e => setCode(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor=''>New Hub?</label>
                    </div>
                    <div>
                        <div>
                            <input 
                                type='radio'
                                name='hub'
                                value='1'
                                id='1'
                                checked='checked'
                                onChange={e => setHub(e.target.value)}
                            /> 
                            <label htmlFor='1'>YES</label>
                        </div>
                        <div>
                            <input
                                type='radio'
                                name='hub'
                                value='0'
                                id='0'
                                onChange={e => setHub(e.target.value)}
                            />
                            <label htmlFor='0'>NO</label>
                        </div>
                    </div>
                    <button type='submit' className='btn btn-success mt-2' >Save</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default addAirport