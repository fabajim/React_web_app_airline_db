import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import moment from 'moment';

function AircraftPage() {
  const [data, setData] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:8081/aircraft')
    .then((res)=> {
      setData(res.data);
      console.log(res.data);
    })
    .catch((err)=> console.log(err));
  }, [])
  return (
    <>
    <h1 className='page-name'>Aircraft</h1>
    <Link className={'add-element'} to='/addAircraft'>Add New Aircraft +</Link>
      <table class="read-table">
        <thead>
          <tr>
            <th>Aircraft ID</th>
            <th>Last Serviced</th>
            <th>Hours Flown</th>
            <th>Aircraft Type</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => {
            return(
              <tr key = {i}>
                <td>{d.aircraftID}</td>
                <td>{new Date(d.nextService).toLocaleDateString()}</td>
                <td>{d.totalHourFlown}</td>
                <td>{d.aircraftTypeID}</td>
              </tr>)
          })}
        </tbody>
      </table>
    </>
  );
}

export default AircraftPage;