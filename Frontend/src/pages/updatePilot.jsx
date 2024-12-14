import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function updatePilot() {
    const [data, setData] = useState([])
    let [fname, setFname] = useState('')
    let [lname, setLname] = useState('')
    let [certs, setCerts] = useState('')

    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8081/getPilot/${id}`)
        .then((res) => {
            setData(res.data);
            console.log(res.data)
        })
        .catch((err) => console.log(err));
    }, [id]);

    function handleSubmit(event) {
        event.preventDefault();
        //use default values if no change was made
        if(fname === ""){
            fname = data[0].fname;
        }
        if(lname === ""){
            lname = data[0].lname;
        }
        if(certs === ""){
            certs = data[0].totalCertificate;
        }
        axios.put(`http://localhost:8081/updatePilot/${id}`, {fname, lname, certs})
        .then(res => {
            navigate('/pilots');
            console.log(res);
        })
        .catch(err => console.log(err))
    }

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            {data.map((pilots, i) => {
                return(
                <form onSubmit={handleSubmit} key={i}>
                    <h2>Edit Pilot Info: {pilots.fname} {pilots.lname}</h2>
                    <div className='mb-2'>
                        <label htmlFor="fname">First Name</label>
                        <input defaultValue={pilots.fname} key={pilots.fname} type='text' name='fname' 
                        autoFocus className='form-control' required 
                        onChange={(e) => setFname(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="lname">Last Name</label>
                        <input defaultValue={pilots.lname} type='text' name='lname' className='form-control' required 
                        onChange={(e) => setLname(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="certs">Total Certificates</label>
                        <input defaultValue={pilots.totalCertificate} type='number' name='certs' className='form-control' required 
                        onChange={(e) => setCerts(e.target.value)} />
                    </div>
                    <button type="submit" className='btn btn-success'>Update</button>
                </form>
                )
            })}
        </div>
    </div>
  )
}

export default updatePilot