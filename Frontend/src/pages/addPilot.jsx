import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function addPilot() {
    const [data, setData] = useState([])
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [license, setLicense] = useState('')
    const [date, setDate] = useState('')

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
            navigate('/pilots');
        })
    }, []);

    function handleSubmit(event){
        event.preventDefault();
        console.log("in submit")
        axios.post('http://localhost:8081/pilots', {fname, lname, email, phone, license, date})
        .then(res => {
            if(res.data === 'Insert Successful') {
                Swal.fire('New pilot added.');
            }
            navigate('/pilots');
        }).catch(err =>console.log(err))
    }
  return (
    <div className='d-flex vh-100 justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Add a new pilot</h2>
                <div className='mb-2'>
                    <label htmlFor="">First Name</label>
                    <input type='text' name='fname' autoFocus placeholder='First name' className='form-control' required 
                    onChange={e => setFname(e.target.value)} />
                </div>
                <div className='mb-2'>
                    <label htmlFor="">Last Name</label>
                    <input type='text' name='lname' placeholder='Last name' className='form-control' required 
                    onChange={e => setLname(e.target.value)} />
                </div>
                <div className='mb-2'>
                    <label htmlFor="">Email</label>
                    <input type='email' name='email' className='form-control' required 
                    onChange={e => setEmail(e.target.value)} />
                </div>
                <div className='mb-2'>
                    <label htmlFor="">Phone Number</label>
                    <input type='tel' name='phone' className='form-control' required 
                    onChange={e => setPhone(e.target.value)} />
                </div>
                <div className="mb-2">
                    <div><label>Add Pilots License: </label></div>
                    <select onChange={e => setLicense(e.target.value)} required>
                    <option value="">Select License</option>
                    {data.map((data) => { return (
                        <option key={data.licenseID} value={data.licenseID}>
                            {data.licenseType}
                        </option>
                    )})}
                </select>
                </div>
                <div className="mb-2">
                    <label htmlFor=''>Date Received</label>
                    <input type="date" 
                    name='date' 
                    className='form-control'
                    required 
                    onChange={e => setDate(e.target.value)} />
                </div>
                <button className='btn btn-success' >Save</button>
            </form>
        </div>
    </div>
  )
}

export default addPilot