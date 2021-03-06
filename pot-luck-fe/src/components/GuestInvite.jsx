import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';
import Guest from './Guest';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Button, FormGroup, Input, Container, Row, Col, Label
} from 'reactstrap';

const GuestInvite = () => {

  const [search, setSearch] = useState("");
  const [guests, setGuests] = useState([]);
  const [invitedGuests, setInvitedGuests] = useState([]);
  const [inviteMessage, setInviteMessage] = useState("No Guests Have Been Invited Yet!")

  const id = useParams();
  const history = useHistory();

  const updateGuests = (guest) => {
    // setInvitedGuests(invitedGuests.includes(guest.id) ? [...invitedGuests, guest] : invitedGuests);
    setInvitedGuests([...invitedGuests, guest]);
    setGuests(
    guests.filter(oldGuest => {
      // console.log("guest.id", guest)
      // console.log("oldGuest.id", oldGuest.id)
      return(
        guest.guestId !== oldGuest.id
      )
    })
    )
    console.log("Invited guests", invitedGuests)
  }

  const changeHandler = (e) => {
    setSearch(e.target.value);
    axiosWithAuth()
      .get(`https://bw-potluckplanner.herokuapp.com/api/users?username=${search}`)
      .then(res => {
        console.log(res);
        setGuests(res.data.users);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const inviteGuests = () => {
    invitedGuests.map(guest => {
      return(
      axiosWithAuth()
        .post(`https://bw-potluckplanner.herokuapp.com/api/potlucks/${id.id}/invitations`, guest)
        .then(res => {
          console.log("Guest invites", res)
          setInviteMessage("Guests have been successfully Invited")
          setInvitedGuests([]);
        })
        .catch(err => {
          console.log(err);
        }))
      })
      history.push("/potlucks")
  }

  return(
<Container style={{display: 'flex', justifyContent: 'center'}}>
  <Row>
    <Col style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'lightgrey'}} className="mt-5">
      <h1>Guest Invitations</h1>
      <p>Now that you've began to organize a new potluck why not invite some guests?</p>
        <FormGroup>
        {/* <Label htmlFor="search">Search: </Label> */}
        <Input 
        type="text"
        name="search"
        id="search"
        placeholder="Search for guests to invite"
        value={search}
        onChange={changeHandler}
        />
        </FormGroup>
        { 
          guests[0] ? guests.map(guest => <Guest key={guest.id} guest={guest} setGuest={updateGuests}/>) : <h4>Search for the Username of guests you want to invite</h4>
        }
      
      <h3>Invited Guests:</h3>
      {
        invitedGuests[0] ? invitedGuests.map(guest => <h4>{guest.username}</h4>) : <h4>{inviteMessage}</h4>
      }
      <Button className="mb-3 mt-2" onClick={() => inviteGuests()}>Invite Guests!</Button>
    </Col>
  </Row>
</Container>
  )
}

export default GuestInvite;