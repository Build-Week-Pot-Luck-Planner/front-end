import React, { useState } from 'react';

const Item = (props) => {

  const [buttonMessage, setButtonMessage] = useState("Add");

  const updateItem = () => {
    // console.log(props.user)
    setButtonMessage(`Guest Responsible: ${props.user.username}`);
  }

  return(
    <div key={props.item.name}>
      <h4>{props.item.name}</h4>
      <button onClick={updateItem}>{buttonMessage}</button>
    </div>
  )
}

export default Item;