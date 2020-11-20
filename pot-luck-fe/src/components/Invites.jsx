import React, { useState } from 'react';

const Invites = (props) => {

const [inviteMessage, setInviteMessage] = useState(null);

  const acceptInvite = (iviteId) => {
    
  }

  const declineInvite = (inviteId) => {

  }

return(
        <div>
          <h3>Potluck: {props.invite.title}</h3>
          <p>Where: {props.invite.location}</p>
          <p>When: {props.invite.when}</p>
          {
            inviteMessage ? <p>{inviteMessage}</p> : 
          <div>
            <button>Accept</button>
            <button>Decline</button>
          </div>
          }
        </div>
)
}

export default Invites;