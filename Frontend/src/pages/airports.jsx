import React, { useEffect, useState } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';

function airports() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/airports')
        .then((res)=> {
            setData(res.data);
            console.log(res.data);
        })
        .catch((err)=> console.log(err));
    }, []);

  return (
    <>
    <h1 className='page-name'>Airports</h1>
      <table className="read-table">
        <thead>
          <tr>
            <th>Airport ID</th>
            <th>City</th>
            <th>City Code</th>
            <th>Is Hub?</th>
            <th>Total Aircraft</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => {
            return(
              <tr key = {i}>
                <td>{d.airportID}</td>
                <td>{d.city}</td>
                <td>{d.cityCode}</td>
                <td>{d.isHub}</td>
                <td>{d.totalAircraft}</td>
              </tr>)
          })}
        </tbody>
      </table>
    </>
  )
}

export default airports