import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function currentAssignments() {
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    /*
      Fetch and set data from the current assignments api
    */
    useEffect(() => {
        axios.get('http://localhost:8081/assignmentCurrent')
        .then((res)=> {
            setData(res.data);
            console.log(res.data);
        })
        .catch((err)=> console.log(err));
    }, []);

    /*
      Handles the click on the update button,
      only updates assignments marked as current.
      Past assignments cannot be updated.
    */
    function updateClick(id, serial, city, curr) {
      if (curr === 'NO'){
        alert("Cannot update non current rows");
      } else {
        navigate(`/updateAssignment/${id}:${serial}:${city}`)
      }
    }
    
  return (
    <>
      <h1 
        className='page-name'>
          Current Assignments Log
      </h1>
      <div className='table-container'>
        <table className="read-table">
          <thead>
            <tr>
              <th>Assignment ID</th>
              <th>Pilot</th>
              <th>Aircraft</th>
              <th>Current Location</th>
              <th>Current</th>
              <th>
                <Link
                  to='/pastAssignments'
                  className='btn btn-sm btn-dark'
                  title='View all past assignments'>Past</Link>
              </th>
              <th>
                <Link
                  to='/assignments'
                  className='btn btn-sm btn-light'
                  title='View all assignments'>
                  All    
                </Link> 
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => {
              return(
                <tr key = {i}>
                  <td>{d.assignmentDetailID}</td>
                  <td>{d.fname|| ''} {d. lname || "NONE"}</td>
                  <td>{d.serialNum}</td>
                  <td>{d.cityCode}</td>
                  <td>{d.isActive}</td>
                  <td colSpan="2">
                      <button className='btn btn-secondary btn-sm' 
                        onClick={ () => updateClick(d.assignmentDetailID, d.serialNum, d.cityCode, d.isActive)}>
                          Update
                      </button>
                  </td>
                </tr>)
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default currentAssignments