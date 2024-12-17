import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function aircraftType() {
    const [data, setData] = useState([]);
    const [deleted, setDeleted] = useState(true)

    useEffect(() => {
        if(deleted){
            setDeleted(false)
            axios.get('http://localhost:8081/aircraftType')
            .then((res) => {
                setData(res.data);
                console.log(res.data);
            })
            .catch(err => console.log(err))
        }
    }, [deleted])

    function handleDelete(id, model){
        console.log("In Delete")
        axios.delete(`http://localhost:8081/deleteAircraftType/${id}`)
        .then((res) =>{
            setDeleted(true);
            if (res.data.code === 'ER_ROW_IS_REFERENCED_2') {
                Swal.fire({
                    title: `${model} cannot be deleted!`,
                    text: "An aircraft of this type exists in the database.",
                    icon: "warning"
                  });
            }
            
        })
        .catch((err) => console.log(err));

    }

  return (
    <>
        <h1 className='page-name'>Aircraft Type</h1>
            <table className="read-table">
            <thead>
                <tr>
                <th>AircraftType ID</th>
                <th>Model</th>
                <th>Total Seating</th>
                <th>License Needed</th>
                <th><Link className={'add-element'} to='/addType' title='Add new aircraft type'>ADD+</Link></th>
                </tr>
            </thead>
            <tbody>
                {data.map((d, i) => {
                return(
                    <tr key = {i}>
                    <td>{d.aircraftTypeID}</td>
                    <td>{d.model}</td>
                    <td>{d.totalSeating}</td>
                    <td>{d.licenseID}</td>
                    <td>
                    <button className="btn btn-danger btn-sm" onClick={ () => handleDelete(d.aircraftTypeID, d.model)}>Delete</button>
                    </td>
                    </tr>)
                })}
            </tbody>
        </table>
    </>
  )
}

export default aircraftType