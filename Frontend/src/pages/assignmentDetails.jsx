import React, { useEffect, useState } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';

function assignmentDetails() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/assignmentDetails')
        .then((res)=> {
            setData(res.data);
            console.log(res.data);
        })
        .catch((err)=> console.log(err));
    }, []);

  return (
    <>
    <h1 className='page-name'>Assignments Log</h1>
      <table className="read-table">
        <thead>
          <tr>
            <th>Assignment ID</th>
            <th>Pilot</th>
            <th>Aircraft</th>
            <th>Current Location</th>
            <th>Current</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => {
            return(
              <tr key = {i}>
                <td>{d.assignmentDetailID}</td>
                <td>{d.fname} {d. lname}</td>
                <td>{d.serialNum}</td>
                <td>{d.cityCode}</td>
                <td>{d.isActive}</td>
              </tr>)
          })}
        </tbody>
      </table>
    </>
  )
}

export default assignmentDetails