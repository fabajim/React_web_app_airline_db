import React, { useEffect, useState } from 'react';

function PilotPage() {
  const [data, setData] = useState([])
  useEffect(()=>{
    fetch('http://localhost:8081/pilots')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log(err));
  }, [])

  return (
    <>
      <table class="read-table">
        <thead>
          <tr>
            <th>Pilot ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Number of Certificates</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key = {i}>
              <td>{d.pilotID}</td>
              <td>{d.fname}</td>
              <td>{d.lname}</td>
              <td>{d.totalCertificate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default PilotPage;