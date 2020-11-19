import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';
import Guest from './Guest';

const GuestInvite = () => {

  const [search, setSearch] = useState("");
  const [guests, setGuests] = useState([]);
  const [invitedGuests, setInvitedGuests] = useState([]);
  const [inviteMessage, setInviteMessage] = useState("No Guests Have Been Invited Yet!")

  const id = useParams();
  const history = useHistory();

  const updateGuests = (guest) => {
    // setInvitedGuests(invitedGuests.includes(guest.id) ? [...invitedGuests, guest] : invitedGuests);
    setInvitedGuests([...invitedGuests, guest]);
    setGuests(
    guests.filter(oldGuest => guest.id !== oldGuest.id)
    )
    console.log(invitedGuests)
  }

  const changeHandler = (e) => {
    setSearch(e.target.value);
    axiosWithAuth()
      .get(`https://bw-potluckplanner.herokuapp.com/api/users?username=${search}`)
      .then(res => {
        console.log(res);
        setGuests(res.data.users);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const inviteGuests = () => {
    invitedGuests.map(guest => {
      return(
      axiosWithAuth()
        .post(`https://bw-potluckplanner.herokuapp.com/api/potlucks/${guest.id}/invitations`, guest)
        .then(res => {
          console.log("Guest invites", res)
          setInviteMessage("Guests have been successfully Invited")
          setInvitedGuests([]);
        })
        .catch(err => {
          console.log(err);
        }))
      })
      history.push("/potlucks")
  }

  return(
  <div>
    <h1>You Made it to Guest Invitations page</h1>
    <p>Not that you've began to organize a new potluck why not invite some guests?</p>
    <label htmlFor="search">Search: </label>
    <input 
    type="text"
    name="search"
    id="search"
    placeholder="Search for guests to invite"
    value={search}
    onChange={changeHandler}
    />
    { 
    guests[0] ? guests.map(guest => <Guest key={guest.id} guest={guest} setGuest={updateGuests}/>) : <h4>Search for the Username of guests you want to invite</h4>
    }
    <br/>
    <h3>Invited Guests:</h3>
    {
      invitedGuests[0] ? invitedGuests.map(guest => <h4>{guest.username}</h4>) : <h4>{inviteMessage}</h4>
    }
    <button onClick={() => inviteGuests()}>Invite Guests!</button>
  </div>
  )
}

export default GuestInvite;