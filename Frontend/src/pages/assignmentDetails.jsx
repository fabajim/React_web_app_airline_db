import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function assignmentDetails() {
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081/assignmentDetails')
        .then((res)=> {
            setData(res.data);
            console.log(res.data);
        })
        .catch((err)=> console.log(err));
    }, []);

    function updateClick(id, curr) {
      if (curr === 'NO'){
        alert("Cannot update non current rows");
      } else {
        navigate(`/updateAssignment/${id}`);
      }
    }

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
            <th></th>
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
                <td>
                    <button className='btn btn-secondary btn-sm' 
                      onClick={ () => updateClick(d.assignmentDetailID, d.isActive)}>
                        Update
                    </button>
                </td>
              </tr>)
          })}
        </tbody>
      </table>
    </>
  )
}

export default assignmentDetails