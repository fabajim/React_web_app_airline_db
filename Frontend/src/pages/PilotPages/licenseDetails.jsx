import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

function licenseDetails() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [data, setData] = useState([]);
  const [lData, setLData] = useState([]);
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  let {id} = useParams();
  const vals = id.split(":");
  const pilotId = vals[0];
  const navigate = useNavigate();
  
  useEffect(() => {
      axios.get(`http://localhost:8081/licenseDetails/${pilotId}`)
      .then((res) => {
          setData(res.data);
          console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:8081/license`)
    .then((res) => {
        setLData(res.data);
        console.log(res.data);
    })
    .catch((err) => console.log(err));
}, []);

  function handleClick() {
      navigate('/pilots');
  }

  function verifyData() {
    for (let i = 0; i < data.length; i++) {
      if (data[i].licenseID == type) {
        alert ("Cannot add duplicate license.");
        return false;
      }
    }
    return true;
  }

  async function handleSubmit(event){
    event.preventDefault();
    const strPilotID = pilotId.toString();
    let verify = verifyData();
    if (!verify){
      console.log("License not added")
    } else{
    axios.post('http://localhost:8081/licenseDetails', { strPilotID, type, date })
    .then( res => {
      console.log(res);
      alert("New License added.")
      navigate('/pilots');
    }).catch(err => console.log(err))
    }
  }

  function handleDelete(id) {
    if (data.length == 1) {
      alert("Pilot must have a license!")
    } else {
      axios.delete(`http://localhost:8081/licenseDetails/${id}`)
      .then((res) => {
        console.log(res);
        navigate('/pilots');
      })
      .catch((err) => console.log(err))
    }
  }

  return (
    <>
      <h1 className='page-name'>{vals[1]} {vals[2]}'s license details</h1>
        <div>
          <table className="read-table">
              <thead>
                <tr>
                  <th>License Type</th>
                  <th>Date Received</th>
                  <th>
                    <button className="add-element" onClick={() => setShowAddForm(!showAddForm)}>Add</button>
                  </th>
                  <th>
                  <button className='btn btn-dark btn' onClick={() => handleClick()}>Back</button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((d, i) => {
                  return(
                    <tr key = {i}>
                      <td>{d.licenseType}</td>
                      <td>{new Date(d.dateReceived).toLocaleDateString()}</td>
                      <td className='center-edit' colSpan={2}>
                        <button  
                          className='btn btn-danger btn-sm'
                          onClick={() => handleDelete(d.licenseDetailsID)}>
                            Delete
                        </button>
                      </td>
                    </tr>)
                })}
              </tbody>
            </table>
          </div>
          <div>
            {showAddForm && (
              <div className='d-flex  justify-content-center align-items-center'>
              <div className='w-25 mt-4 bg-white rounded p-3'>
                  <form onSubmit={handleSubmit}>
                      <h3>Add new license.</h3>
                      <div className="mb-2">
                          <select onChange={e => setType(e.target.value)} required>
                          <option value="">License Type</option>
                          {lData.map((lData) => { return (
                              <option key={lData.licenseID} value={lData.licenseID}>
                                  {lData.licenseType}
                              </option>
                          )})}
                      </select>
                      </div>
                      <div className="mb-2">
                          <label htmlFor=''>Date Received</label>
                          <input type="date" 
                          name='service' 
                          autoFocus 
                          className='form-control' 
                          required onChange={e => setDate(e.target.value)} />
                      </div>
                      <button type='submit' className='btn btn-success' >Save</button>
                  </form>
              </div>
          </div>
            )}
          </div>
    </>
  )
}

export default licenseDetails