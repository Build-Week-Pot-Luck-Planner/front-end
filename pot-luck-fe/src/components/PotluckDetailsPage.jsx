import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';
import styled from 'styled-components';

const ProfileImg = styled.img`
margin-top: 2%;
border-radius: 100%;
height: 100px;
`

const PotluckDetailsPage = () => {

  const id = useParams();
  const [potluck, setPotluck] = useState({})

  useEffect(() => {
     axiosWithAuth()
      .get(`https://bw-potluckplanner.herokuapp.com/api/potlucks/${id.potluckId}`)
      .then(res => {
        console.log(res);
        setPotluck(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  return(
    <div>
      <h1>Potluck Details Page</h1>
      <h2>{potluck.title}</h2>
      <ProfileImg src={potluck.organizerPfp} alt="organizers profile pic"/>
      <h4>Organized by: {potluck.organizerUsername} </h4>
    </div>
  )
}

export default PotluckDetailsPage;