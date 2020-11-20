import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import axiosWithAuth from '../utils/axiosWithAuth';
import Invites from './Invites';

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
      console.log("invites", invite)
      return(
        <Invites key={invite.id} invite={invite}/>
      )
    }) : <p>You Have No Pending Invites</p>
    }
    </div>
  )
}

export default UserInvites;