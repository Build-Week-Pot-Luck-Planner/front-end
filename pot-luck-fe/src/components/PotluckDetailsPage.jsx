import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';
import styled from 'styled-components';
// import { PotluckContext } from '../contexts/PotluckContext';

const ProfileImg = styled.img`
margin-top: 2%;
border-radius: 100%;
height: 100px;
`

const PotluckDetailsPage = () => {

  const id = useParams();
  const [potluck, setPotluck] = useState({})
  const [guests, setGuests] = useState([])
  const [items, setItems] = useState([])
  // const user = useContext(PotluckContext);

  useEffect(() => {
     axiosWithAuth()
      .get(`https://bw-potluckplanner.herokuapp.com/api/potlucks/${id.potluckId}`)
      .then(res => {
        console.log(res);
        setPotluck(res.data);
        setGuests(res.data.guests)
        setItems(res.data.items)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])
  

  return(
    <div>
        <h1>Potluck Details Page</h1>
      <div>
        <h2>{potluck.title}</h2>
        <ProfileImg src={potluck.organizerPfp} alt="organizers profile pic"/>
        <h4>Organized by: {potluck.organizerUsername} </h4>
        <p>When: {potluck.when}</p>
        <p>When: {potluck.location}</p>
      </div>

      <div>
        <h2>Guests</h2>
        {
          guests[0] ? guests.map(guest => {
            <div>
              <p>Guest Name Here</p>
              <p>Accepted or Declined Here</p>
            </div>
          }) : <p>No Pending Guest Invitations</p>
        }
      </div>

      <div>
        <h2>Items to Bring</h2>
        {
          items.map(item => {
            return(
              <div>
                <h4>{item.name}</h4>
                <button>Add</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default PotluckDetailsPage;