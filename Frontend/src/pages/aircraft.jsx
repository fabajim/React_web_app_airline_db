import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function AircraftPage() {
  const [data, setData] = useState([])
  const [deleted, setDeleted] = useState(true)

  useEffect(()=>{
    if(deleted){
      setDeleted(false)
      axios.get('http://localhost:8081/aircraft')
      .then((res)=> {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err)=> console.log(err));
    }
  }, [deleted])

  function handleClick(id){
    Swal.fire({
      title: `Delete this aircraft: ${id}?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete"
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    })
  }

  function handleDelete(id){
    axios.delete(`http://localhost:8081/aircraft/${id}`)
    .then((res) => {
      setDeleted(true)
    })
    .catch((err) => console.log(err))
  }

  return (
    <>
   
    <h1 className='page-name'>Aircraft</h1>

      <table className="read-table">
        <thead>
          <tr>
            <th>Aircraft ID</th>
            <th>Serial Number</th>
            <th>Aircraft Type</th>
            <th>Current Location</th>
            <th>Last Serviced</th>
            <th>Hours Flown</th>
            <th>
            </th>
            <th><Link className={'add-element'} to='/addAircraft' title='Add new aircraft'>ADD+</Link></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => {
            return(
              <tr key = {i}>
                <td>{d.aircraftID}</td>
                <td>{d.serialNum}</td>
                <td>
                  <Link to={`/getType/${d.aircraftTypeID}`} 
                    className='btn btn-primary btn-sm'
                    title='View Aircraft Details'>
                    {d.model}
                  </Link>
                </td>
                <td>{d.location}</td>
                <td>{new Date(d.lastService).toLocaleDateString()}</td>
                <td>{d.totalHourFlown}</td>
                <td>
                  <Link to={`/updateAircraft/${d.aircraftID}`} className="btn btn-secondary btn-sm">Update</Link>
                </td>
                <td>
                <button className="btn btn-danger btn-sm" onClick={ () => handleClick(d.aircraftID)}>Delete</button>
                </td>
                <td></td>
              </tr>)
          })}
        </tbody>
      </table>
    </>
  );
}

export default AircraftPage;