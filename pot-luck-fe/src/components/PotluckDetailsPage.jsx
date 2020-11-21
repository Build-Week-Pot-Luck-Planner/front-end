import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';
import styled from 'styled-components';
import { PotluckContext } from '../contexts/PotluckContext';
import Item from './Item';
import EditPotluckForm from './EditPotluckForm';
import DatePicker from 'react-datepicker';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';

const ProfileImg = styled.img`
margin-top: 2%;
border-radius: 100%;
height: 100px;
`

const PotluckDetailsPage = () => {

  const id = useParams();
  const history = useHistory();
  const [potluck, setPotluck] = useState({})
  const [guests, setGuests] = useState([])
  const [invites, setInvites] = useState([])
  const [items, setItems] = useState([])
  const [guestItems, setGuestItems] = useState([]);
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState(false)
  const user = useContext(PotluckContext);

  useEffect(() => {
     axiosWithAuth()
      .get(`https://bw-potluckplanner.herokuapp.com/api/potlucks/${id.potluckId}`)
      .then(res => {
        console.log(res);
        setPotluck(res.data);
        setGuests(res.data.guests)
        console.log(guests)
        setItems(res.data.items)
      })
      .catch(err => {
        console.log(err);
      })
  }, [edited])

  useEffect(() => {
    axiosWithAuth()
      .get(`https://bw-potluckplanner.herokuapp.com/api/potlucks/${id.potluckId}/invitations`)
      .then(res => {
        console.log('Potluck Invitations', res);
        setInvites(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const deletePotluck = () => {
    axiosWithAuth()
      .delete(`https://bw-potluckplanner.herokuapp.com/api/potlucks/${id.potluckId}`)
      .then(res => {
        console.log(res);
        history.push("/potlucks");
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  return(
    <div>
    {!editing ?
        <div>
        <CardTitle tag="h1" style={{textAlign: 'center'}}>Potluck Details Page</CardTitle>
        <Card style={{display: 'flex', alignItems: 'center', padding: '15px'}}>
        <CardText tag="h2">{potluck.title}</CardText>
        <ProfileImg src={potluck.organizerPfp} alt="organizers profile pic"/>
        <CardText tag="h4">Organized by: {potluck.organizerUsername} </CardText>
        <CardText>Where: {potluck.location}</CardText>
        <CardText style={{margin: '0'}}>When: </CardText>
        { potluck.when ?
          <DatePicker
            selected={new Date(potluck.when)}
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy h:mm aa"
            showTimeInput
            disabled
          /> : null
        }
      </Card>

      <Card style={{display: 'flex', alignItems: 'center', backgroundColor: 'lightgrey'}}>
        <CardTitle tag="h2">Guests</CardTitle>
        {
          guests[0] ? guests.map(guest => {
            return(
            <CardBody style={{display: 'flex', flexDirection: "column", alignItems: 'center'}}>
              <CardText tag="h4">{guest.username}</CardText>
              <ProfileImg src={guest.pfp} alt="guest profile img" />
            </CardBody>
            )
          }) : <p>No Guests Are Attending Yet</p>
        }
      </Card>

      <Card style={{display: 'flex', alignItems: 'center'}}>
        <h2>Guest Invites</h2>
        <CardBody style={{display: 'flex'}}>
        {
          invites[0] ? invites.map(invite => {
            return(
              <CardText style={{margin: '0 15px'}} tag="h4">{invite.username}</CardText>
              )
            }) : <p>No Guests Have been Invited</p>
          }
          </CardBody>
      </Card>

      <Card style={{display: 'flex', alignItems: 'center', backgroundColor: 'lightgrey'}}>
        <h2>Items to Bring</h2>
        <CardBody style={{display: 'flex'}}>
        {
          items.map(item => {
            return(
              <Item item={item} user={user.userData} />
            )
          })
        }
        </CardBody>
      </Card>
        <div style={{display: 'flex', justifyContent: 'center', margin: '25px'}}>
      <Button style={{margin: '0 15px'}} onClick={() => setEditing(true)}>Edit Potluck</Button>
      <Button style={{margin: '0 15px'}} onClick={() => deletePotluck()}>Delete Potluck</Button> 
      </div>
      </div> : 
      <div>
        <EditPotluckForm potluck={potluck} items={items} setEditing={setEditing} setPotluck={setPotluck} setEdited={setEdited} edited={edited}/>
      </div>}
    </div>
  )
}

export default PotluckDetailsPage;