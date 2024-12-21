import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

function licenseDetails() {
  const [data, setData] = useState([]);
  let {id} = useParams();
  const vals = id.split(":");
  const pilotId = vals[0];
  const navigate = useNavigate();
  
  useEffect(() => {
      axios.get(`http://localhost:8081/pilotLicense/${pilotId}`)
      .then((res) => {
          setData(res.data);
      })
      .catch((err) => console.log(err));
  })

  function handleClick() {
      navigate('/pilots');
  }

  return (
    <>
    <h1 className='page-name'>{vals[1]} {vals[2]}'s license details</h1>
      <table className="read-table">
          <thead>
            <tr>
              <th>License Type</th>
              <th>Date Received</th>
              <th>
                  <button className='btn btn-dark btn-sm' onClick={() => handleClick()}>Back</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => {
              return(
                <tr key = {i}>
                  <td>{d.licenseType}</td>
                  <td>{new Date(d.dateReceived).toLocaleDateString()}</td>
                  <td></td>
                </tr>)
            })}
          </tbody>
        </table>
    </>
  )
}

export default licenseDetails