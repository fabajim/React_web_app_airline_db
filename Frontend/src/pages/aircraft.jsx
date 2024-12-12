import React, { useEffect, useState } from 'react';
//import moment from 'moment';

function AircraftPage() {
  const [data, setData] = useState([])
  useEffect(()=>{
    fetch('http://localhost:8081/aircraft')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log(err));
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
          {data.map((d, i) => (
            <tr key = {i}>
              <td>{d.aircraftID}</td>
              <td>{d.nextService}</td>
              <td>{d.totalHourFlown}</td>
              <td>{d.aircraftTypeID}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AircraftPage;