import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function addType() {
  const [data, setData] = useState([]);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [seating, setSeating] = useState('');
  const [license, setLicense] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/license')
    .then((res) => {
        console.log(res.data)
        setData(res.data);
    })
    .catch((err) => {
        alert("Server Error: " + err);
        console.log(err);
        navigate('/aircraftType');
    });
  }, []);

  function handleSubmit(event){
      event.preventDefault();
      axios.post('http://localhost:8081/aircraftType', {make, model, seating, license})
      .then(res => {
          navigate('/aircraftType');
          console.log(res);
      }).catch(err => console.log(err));
  }

  return (
    <>
<h2 className='add-data-heading'>Add New Aircraft Type</h2>
    <div className='d-flex  justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h3>Fill in all data.</h3>
                <div className="mb-2">
                    <label htmlFor=''>Make</label>
                    <input type="text" 
                    name='make' 
                    autoFocus 
                    className='form-control' 
                    required onChange={e => setMake(e.target.value)} />
                </div>
                <div className="mb-2">
                    <label htmlFor=''>Model</label>
                    <input type="text" 
                    name='model' 
                    autoFocus 
                    className='form-control' 
                    required onChange={e => setModel(e.target.value)} />
                </div>
                <div className="mb-2">
                    <label htmlFor=''>Total Seating</label>
                    <input type="number" 
                    name='seating' 
                    min="0" 
                    className='form-control' 
                    required onChange={e => setSeating(e.target.value)} />
                </div>
                <div className="mb-2">
                    <div><label>License Needed: </label></div>
                    <select onChange={e => setLicense(e.target.value)} required>
                    <option value="">Select License</option>
                    {data.map((data) => { return (
                        <option key={data.licenseID} value={data.licenseID}>
                            {data.licenseType}
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

export default addType