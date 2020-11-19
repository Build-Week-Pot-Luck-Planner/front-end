import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import axiosWithAuth from '../utils/axiosWithAuth';

const UserInvites = () => {

  const user = useContext(UserContext);
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get(`https://bw-potluckplanner.herokuapp.com/api/users/${user.id}/invitations`)
      .then(res => {
        console.log(res);
        setInvites(res.data);
      })
      .catch(err => {
        console.log(err)
      })
  }, [user.id])

  return (
    <div>
    <h2>This is for the user invites section</h2>
    {
    invites[0] ? invites.map(invite => {
      return(
        <div>
          <h3>Potluck: {invite.title}</h3>
          <p>From: {invite.username}</p>
          <button>Accept</button>
          <button>Decline</button>
        </div>
      )
    }) : <p>You Have No Pending Invites</p>
    }
    </div>
  )
}

export default UserInvites;