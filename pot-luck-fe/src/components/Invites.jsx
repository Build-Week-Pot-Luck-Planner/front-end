import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

const Invites = (props) => {

const [inviteMessage, setInviteMessage] = useState(null);

  const answerInvite = (status) => {
    console.log(status);
    axiosWithAuth()
      // .put(`https://bw-potluckplanner.herokuapp.com/api/potlucks/${props.invite.potluckId}/invitations/${props.invite.id}`, {status: 1})
      .put(`https://bw-potluckplanner.herokuapp.com/api/potlucks/1/invitations/1`, {status: 1})
      .then(res => {
        console.log(res)
        setInviteMessage(res.data.message);
      })
      .catch(err => {
        console.log(err);
      })
  }

return(
        <div>
          <h3>Potluck: {props.invite.title}</h3>
          <h4>Organizer: {props.invite.username}</h4>
          <p>Where: {props.invite.location}</p>
          <p>When: {props.invite.when}</p>
          {
            inviteMessage ? <p>{inviteMessage}</p> : 
          <div>
            <button onClick={() => answerInvite({status: 1})}>Accept</button>
            <button onClick={() => answerInvite({status: -1})}>Decline</button>
          </div>
          }
        </div>
)
}

export default Invites;