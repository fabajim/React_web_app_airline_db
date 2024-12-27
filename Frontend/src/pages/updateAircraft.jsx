import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom';

function updateAircraft() {
  const [data, setData] = useState([]);
  let [date, setDate] = useState('')
  let [hours, setHours] = useState('')

  const navigate = useNavigate()
  const {id} = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8081/getAircraft/${id}`)
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => console.log(err));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(date)
    if(date === ""){
      date = data[0].lastService;
    }
    if(hours === ""){
      hours = data[0].totalHourFlown;
    }
    axios.put(`http://localhost:8081/updateAircraft/${id}`, {date, hours})
    .then(res => {
      navigate('/aircraft');
    })
    .catch(err => console.log(err))
  }

  return (
    <>
    <h2 className='add-data-heading'>Update Aircraft Page</h2>
    <div className='d-flex justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            {data.map((d, i) => {
                return(
                <form onSubmit={handleSubmit} key={i}>
                    <h2>Edit Aircraft ID: {id}</h2>
                    <div>
                      <Link to='/aircraft' title="Back to Aircraft Page" className='btn btn-danger btn-bg'>Cancel</Link>
                      </div>
                    <div className='mb-2'>
                        <label htmlFor="date">Update Service Date</label>
                        <input type='date' name='date' 
                        autoFocus className='form-control' 
                        required
                        onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="hours">Update Hours</label>
                        <input defaultValue={d.totalHourFlown} type='number' name='hours' className='form-control' required 
                        onChange={(e) => setHours(e.target.value)} />
                    </div>
                    <button type="submit"
                     className='btn btn-success'
                     title="save changes">Update</button>
                </form>
                )
            })}
        </div>
    </div>
    </>
  )
}

export default updateAircraft