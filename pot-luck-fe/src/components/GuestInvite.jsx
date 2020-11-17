import React, { useState } from 'react';

const GuestInvite = () => {

  const [search, setSearch] = useState("");

  const changeHandler = (e) => {
    setSearch(e.target.value);
    //  add axios call to request users with username of search value
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
    {/* 
      need to render a dropdown with returned users from request to allow user to invite listed users
      also need to allow user to remove a user from selected users if they want.
    */}
    <button>Invite Guests!</button>
  </div>
  )
}

export default GuestInvite;