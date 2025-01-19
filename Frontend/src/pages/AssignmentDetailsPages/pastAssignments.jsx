import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function pastAssignments() {
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    /*
      Fetch and set data from assignmentPast api
      gets all data where isCurrent = 0
    */
    useEffect(() => {
        axios.get('http://localhost:8081/assignmentPast')
        .then((res)=> {
            setData(res.data);
            console.log(res.data);
        })
        .catch((err)=> console.log(err));
    }, []);


    /*
      For fraud protection, all non current assignments cannot
      be updated 
     */
    function updateClick() {
      alert("Cannot update non current assignments!")
    }

  return (
    <>
      <h1 className='page-name'>Past Assignments Log</h1>
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
                  title='View Current assignments'> View Current</Link>
              </th>
              <th>
                <Link
                  to='/assignments'
                  className='btn btn-sm btn-dark'
                  title='View all assignments'>All</Link>
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
                        onClick={ () => updateClick()}>
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

export default pastAssignments