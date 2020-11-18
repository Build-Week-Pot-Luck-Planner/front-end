import React from 'react';

const Guest = (props) => {

return(
  <div>
<h4>Username: {props.guest.username}</h4>
<button>Invite Guest</button>
</div>
)
}

export default Guest;