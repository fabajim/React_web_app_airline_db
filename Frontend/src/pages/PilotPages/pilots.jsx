import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

function PilotPage() {
  const [data, setData] = useState([])
  const [deleted, setDeleted] = useState(true)
  
  /*
      Fetch Api call to get all the data from pilots
  */
  useEffect(()=>{
    if(deleted){
      setDeleted(false)
    axios.get('http://localhost:8081/pilots')
    .then((res)=> {
      setData(res.data)
    })
    .catch((err) => console.log(err));
  }
  }, [deleted])

  /*
      Handles delete button click: Gives a warning to the user
      and waits for a conformation.
      If confirmed, handelDelete is called 
  */
  function handleClick(id, fname, lname){
    Swal.fire({
      title: `Delete ${fname} ${lname}?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete"
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  }

  /*
      Deletes pilot with a Delete api using the pilots ID
  */
  function handleDelete(id){
    axios.delete(`http://localhost:8081/pilots/${id}`)
    .then((res) => {
      setDeleted(true)
    })
    .catch((err) => console.log(err))
  }

  return (
    <>
    <span> 
    <h2 className='page-name'>Pilots</h2>
    
      <table className="read-table">
        <thead>
          <tr>
            <th>Pilot ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Licenses</th>
            <th></th>
            <th><Link className={'add-element'} to='/addPilot'>Add Pilot</Link></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((pilots, i) => {
              return(
                <tr key = {i}>
                  <td>{pilots.pilotID}</td>
                  <td>{pilots.fname}</td>
                  <td>{pilots.lname}</td>
                  <td>{pilots.email}</td>
                  <td>{pilots.phoneNumber}</td>
                  <td>
                  <Link 
                      to={`/viewLicense/${pilots.pilotID}:${pilots.fname}:${pilots.lname}`}
                      className='btn btn-info btn-sm'
                      title='View License Details'>
                      {pilots.totalLicense} 
                    </Link>
                  </td>
                  <td>
                    <Link 
                      to={`/updatePilot/${pilots.pilotID}`} 
                      className="btn btn-secondary btn-sm">
                        Edit Pilot
                    </Link>
                  </td>
                  <td>
                    <button 
                      className="btn btn-danger btn-sm" 
                      onClick={ () => handleClick(pilots.pilotID, pilots.fname, pilots.lname)}>
                        Delete Pilot
                    </button>
                  </td>
                  <td></td>
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