import React, { useEffect, useState } from 'react';
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
      <table class="read-table">
        <thead>
          <tr>
            <th>Aircraft ID</th>
            <th>Next Service</th>
            <th>Hours Flown</th>
            <th>Aircraft Type</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => {
            return(
            <tr key = {i}>
              <td>{d.aircraftID}</td>
              <td>{d.nextService}</td>
              <td>{d.totalHourFlown}</td>
              <td>{d.aircraftTypeID}</td>
            </tr>)
          }
)}
        </tbody>
      </table>
    </>
  );
}

export default AircraftPage;