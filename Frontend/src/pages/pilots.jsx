import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PilotPage() {
  const [data, setData] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:8081/pilots')
    .then((res)=> {
      setData(res.data)
    })
    .catch((err) => console.log(err));
  }, [])
  return (
    <>
    <span> 
    <Link className={'add-element'} to='/addPilot'>Add Pilot</Link>
      <table class="read-table">
        <thead>
          <tr>
            <th>Pilot ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Number of Certificates</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((pilots) => {
              return(
                <tr>
                  <td>{pilots.pilotID}</td>
                  <td>{pilots.fname}</td>
                  <td>{pilots.lname}</td>
                  <td>{pilots.totalCertificate}</td>
                  <td>
                    <button>Edit Pilot</button>
                  </td>
                  <td>
                    <button class="delete-button">Delete Pilot</button>
                  </td>
                </tr>)
            })
          }
        </tbody>
      </table>
      </span>
    </>
  );
}

export default PilotPage;