import React, { useState } from 'react';
import { Button } from 'reactstrap'

const Item = (props) => {

  const [buttonMessage, setButtonMessage] = useState("Add");

  const updateItem = () => {
    // console.log(props.user)
    setButtonMessage(`Guest Responsible: ${props.user.username}`);
  }

  return(
    <div style={{margin: '0 15px', textAlign: 'center'}} key={props.item.name}>
      <h4>{props.item.name}</h4>
      <Button onClick={updateItem}>{buttonMessage}</Button>
    </div>
  )
}

export default Item;