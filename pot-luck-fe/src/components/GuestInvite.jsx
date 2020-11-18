import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import Guest from './Guest';

const GuestInvite = () => {

  const [search, setSearch] = useState("");
  const [guests, setGuests] = useState([]);

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

  return(
  <div>
    <h1>You Made it to Guest Invitations page</h1>
    <p>Not that you've began to organize a new potluck why not invite some guests?</p>
    <input 
    type="text"
    name="search"
    id="search"
    placeholder="Search for guests to invite"
    value={search}
    onChange={changeHandler}
    />
    { 
    guests[0] ? guests.map(guest => <Guest key={guest.id} guest={guest}/>) : <h4>No Guests Have Been Invited Yet!</h4>
    }
    <button>Invite Guests!</button>
  </div>
  )
}

export default GuestInvite;