import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import moment from 'moment';

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

  function handleDelete(id){
    axios.delete(`http://localhost:8081/deleteAircraft/${id}`)
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
            <th>Last Serviced</th>
            <th>Hours Flown</th>
            <th>Aircraft Type</th>
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
                <td>{new Date(d.lastService).toLocaleDateString()}</td>
                <td>{d.totalHourFlown}</td>
                <td>{d.aircraftTypeID}</td>
                <td><button>Update</button></td>
                <td>
                <button className="btn btn-danger btn-sm" onClick={ () => handleDelete(d.aircraftID)}>Delete</button>
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