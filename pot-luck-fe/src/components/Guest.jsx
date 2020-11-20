import React from 'react';

const Guest = (props) => {

return(
  <div>
<h4>Username: {props.guest.username}</h4>
<button onClick={() => props.setGuest({guestId: props.guest.id, username: props.guest.username})}>Invite Guest</button>
</div>
)
}

export default Guest;