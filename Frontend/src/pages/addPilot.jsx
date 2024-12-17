import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function addPilot() {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [certs, setCerts] = useState('')

    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8081/addPilot', {fname, lname, certs})
        .then(res => {
            navigate('/pilots');
            if(res.data === 'Insert Successful') {
                Swal.fire('New pilot added.');
            }
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
                    <label htmlFor="">Total Certificates</label>
                    <input type='number' name='certs' className='form-control' required 
                    onChange={e => setCerts(e.target.value)} />
                </div>
                <button className='btn btn-success' >Save</button>
            </form>
        </div>
    </div>
  )
}

export default addPilot