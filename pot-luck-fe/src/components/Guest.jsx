import React from 'react';
import { Button } from 'reactstrap';

const Guest = (props) => {

return(
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '15px'}}>
<h4>Username: {props.guest.username}</h4>
<Button style={{margin: '0 20px'}} onClick={() => props.setGuest({guestId: props.guest.id, username: props.guest.username})}>Invite Guest</Button>
</div>
)
}

export default Guest;