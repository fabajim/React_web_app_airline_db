import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

function licenseDetails() {
  const [data, setData] = useState([]);
  let {id} = useParams();
  const vals = id.split(":");

  const navigate = useNavigate();
  
  useEffect(() => {
      axios.get(`http://localhost:8081/pilotLicense/${vals[0]}`)
      .then((res) => {
          setData(res.data);
      })
      .catch((err) => console.log(err));
  })

  function handleClick() {
      navigate('/pilots');
  }

  return (
    <>
    <h1 className='page-name'>{vals[1]} {vals[2]} license details</h1>
    </>
  )
}

export default licenseDetails