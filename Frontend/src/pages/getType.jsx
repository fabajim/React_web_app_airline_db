import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

function getType() {
    const [data, setData] = useState([])

    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8081/aircraftType/${id}`)
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => console.log(err));
    })

    function handleClick() {
        navigate('/aircraft');
    }

  return (
    <>
    <h1 className='page-name'>Aircraft Type</h1>
      <table className="read-table">
        <thead>
          <tr>
            <th>Aircraft Type ID</th>
            <th>Make</th>
            <th>Model</th>
            <th>Total Seating</th>
            <th>License Type</th>
            <th>
                <button className='btn btn-dark btn-sm' onClick={() => handleClick()}>Back</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => {
            return(
              <tr key = {i}>
                <td>{d.aircraftTypeID}</td>
                <td>{d.make}</td>
                <td>{d.model}</td>
                <td>{d.totalSeating}</td>
                <td>{d.licenseID}</td>
                <td></td>
              </tr>)
          })}
        </tbody>
      </table>
    </>
  )
}

export default getType