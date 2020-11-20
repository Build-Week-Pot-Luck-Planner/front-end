import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';
import styled from 'styled-components';
import { PotluckContext } from '../contexts/PotluckContext';
import Item from './Item';
import EditPotluckForm from './EditPotluckForm';
import DatePicker from 'react-datepicker';

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
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState(false)
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
  }, [edited])

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
        history.push("/potlucks");
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  return(
    <div>
    {!editing ?
        <div>
        <h1>Potluck Details Page</h1>
      <div>
        <h2>{potluck.title}</h2>
        <ProfileImg src={potluck.organizerPfp} alt="organizers profile pic"/>
        <h4>Organized by: {potluck.organizerUsername} </h4>
        <p>When: </p>
        <DatePicker
          selected={new Date(potluck.when)}
          timeInputLabel="Time:"
          dateFormat="MM/dd/yyyy h:mm aa"
          showTimeInput
          disabled
        />
        <p>Where: {potluck.location}</p>
      </div>

      <div>
        <h2>Guests</h2>
        {
          guests[0] ? guests.map(guest => {
            return(
            <div>
              <ProfileImg src={guest.pfp} alt="guest profile img" />
              <p>{guest.username}</p>
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

      <button onClick={() => setEditing(true)}>Edit Potluck</button>
      <button onClick={() => deletePotluck()}>Delete Potluck</button> 
      </div> : 
      <div>
        <EditPotluckForm potluck={potluck} items={items} setEditing={setEditing} setPotluck={setPotluck} setEdited={setEdited} edited={edited}/>
      </div>}
    </div>
  )
}

export default PotluckDetailsPage;