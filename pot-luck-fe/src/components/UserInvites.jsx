import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import axiosWithAuth from '../utils/axiosWithAuth';
import Invites from './Invites';
import {
  Card, CardText,
  CardTitle
} from 'reactstrap';

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
      <Card style={{alignItems: 'center'}}>
    <CardTitle tag="h3">Your Potluck Invitations</CardTitle>
    {
    invites[0] ? invites.map(invite => {
      console.log("invites", invite)
      return(
        <Invites key={invite.invitationId} invite={invite}/>
      )
    }) : <CardText>You Have No Pending Invites</CardText>
    }
    </Card>
    </div>
  )
}

export default UserInvites;