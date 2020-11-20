import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const Invites = (props) => {

const [inviteMessage, setInviteMessage] = useState(null);

  const answerInvite = (status) => {
    console.log(status);
    axiosWithAuth()
      .put(`https://bw-potluckplanner.herokuapp.com/api/potlucks/${props.invite.potluckId}/invitations/${props.invite.invitationId}`, status)
      // .put(`https://bw-potluckplanner.herokuapp.com/api/potlucks/1/invitations/1`, {status: 1})
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
          <Card style={{border: 'none', display: 'flex', alignItems: 'center', backgroundColor: 'lightgrey'}}>
            <CardBody>
          <CardTitle tag="h3">Potluck: {props.invite.title}</CardTitle>
          <CardTitle tag="h4">Organizer: {props.invite.potluckOrganizer}</CardTitle>
          {
            inviteMessage ? <p>{inviteMessage}</p> : 
          <div>
            <Button style={{margin: '0 5px'}} onClick={() => answerInvite({status: 1})}>Accept</Button>
            <Button style={{margin: '0 5px'}} onClick={() => answerInvite({status: -1})}>Decline</Button>
          </div>
          }
            </CardBody>
          </Card>
        </div>
)
}

export default Invites;