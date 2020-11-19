import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';
import styled from 'styled-components';
import { PotluckContext } from '../contexts/PotluckContext';
import Item from './Item';

const ProfileImg = styled.img`
margin-top: 2%;
border-radius: 100%;
height: 100px;
`

const PotluckDetailsPage = () => {

  const id = useParams();
  const history = useHistory();
  const [potluck, setPotluck] = useState({})
  const [guests, setGuests] = useState([])
  const [invites, setInvites] = useState([])
  const [items, setItems] = useState([])
  const [guestItems, setGuestItems] = useState([]);
  const user = useContext(PotluckContext);

  useEffect(() => {
     axiosWithAuth()
      .get(`https://bw-potluckplanner.herokuapp.com/api/potlucks/${id.potluckId}`)
      .then(res => {
        console.log(res);
        setPotluck(res.data);
        setGuests(res.data.guests)
        console.log(guests)
        setItems(res.data.items)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    axiosWithAuth()
      .get(`https://bw-potluckplanner.herokuapp.com/api/potlucks/${id.potluckId}/invitations`)
      .then(res => {
        console.log('Potluck Invitations', res);
        setInvites(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const deletePotluck = () => {
    axiosWithAuth()
      .delete(`https://bw-potluckplanner.herokuapp.com/api/potlucks/${id.potluckId}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err)
      })
      // history.push("/potlucks");
  }
  

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
            return(
            <div>
              <p>Guest Name Here</p>
              <p>Accepted or Declined Here</p>
            </div>
            )
          }) : <p>No Guests Are Attending Yet</p>
        }
      </div>

      <div>
        <h2>Guest Invites</h2>
        {
          invites[0] ? invites.map(invite => {
            return(
            <div>
              <p>{invite.username}</p>
              <p>Accepted or Declined Here</p>
            </div>
            )
          }) : <p>No Guests Have been Invited</p>
        }
      </div>

      <div>
        <h2>Items to Bring</h2>
        {
          items.map(item => {
            return(
              <Item item={item} user={user.userData} />
            )
          })
        }
      </div>

      {/* <div>
        <h2>Whose Bringing What</h2>
        {
          items.map(item => {
            return(
              <div key={item.name}>
                <h4>{item.name}</h4>
                <button onClick={updateButtonMessage}>{buttonMessage}</button>
              </div>
            )
          })
        }
      </div> */}

      <button>Edit Potluck</button>
      <button onClick={() => deletePotluck()}>Delete Potluck</button>
    </div>
  )
}

export default PotluckDetailsPage;