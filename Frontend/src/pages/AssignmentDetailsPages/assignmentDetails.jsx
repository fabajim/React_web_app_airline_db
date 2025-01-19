import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function assignmentDetails() {
    const [data, setData] = useState([]);

    const navigate = useNavigate();


    /*
      Fetch and set data from assignmentDetails
    */
    useEffect(() => {
        axios.get('http://localhost:8081/assignmentDetails')
        .then((res)=> {
            setData(res.data);
            console.log(res.data);
        })
        .catch((err)=> {
          console.log(err);
          alert(`Server Error: ${err.status}`);
          navigate(-1);
        });
    }, []);

    /*
      Handles the update button click, For fraud
      Protection, only current assignments can be updated.
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
      <h1 className='page-name'>All Assignments Log</h1>
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
                  to='/currentAssignments'
                  className='btn btn-sm btn-light'
                  title='View all current assignments'>View Current</Link>
              </th>
              <th>
                <Link
                  to='/pastAssignments'
                  className='btn btn-sm btn-dark'
                  title='View all past assignments'>Past</Link>
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
                  <td colSpan={2}>
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

export default assignmentDetails