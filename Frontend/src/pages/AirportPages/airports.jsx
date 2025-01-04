import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'

function airports() {
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081/airports')
        .then((res)=> {
            setData(res.data);
            console.log(res.data);
        })
        .catch((err)=> console.log(err));
    }, []);

    function update(id, hub, code) {
      Swal.fire({
        title: `Update Hub status?`,
        text: `${code} will have its hub updated.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Change"
      }).then((result) => {
        if (result.isConfirmed) {
          handleUpdate(id, hub);
        }
      });
    }

    function handleUpdate(id, hub) {
      let updateHub =  hub === 'YES' ? 0 : 1;
      axios.put(`http://localhost:8081/airports/${id}`, {updateHub})
      .then((res) => {
        alert('Airport Updated');
        navigate(0);
      })
      .catch((err) => {
        alert('ERROR ' + err.status);
      })
    }

  return (
    <>
    <h1 className='page-name'>Airports</h1>
      <table className="read-table">
        <thead>
          <tr>
            <th>Airport ID</th>
            <th>City</th>
            <th>City Code</th>
            <th>Hub</th>
            <th>Total Aircraft</th>
            <th>
              <Link className={'add-element'} 
                to='/addAirport'>
                    ADD+
              </Link>
            </th>
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
                <td className='total-aircraft'>{d.totalAircraft}</td>
                <td>
                  <button
                    className='btn btn-secondary btn-sm'
                    onClick={ () => update(d.airportID, d.isHub, d.cityCode) }>
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

export default airports