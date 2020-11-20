import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../contexts/UserContext';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';

const ProfileImg = styled.img`
margin-top: 2%;
border: 1px solid black;
border-radius: 100%;
// height: 100px;
width: 10%
`

const UserInfo = () => {

  const user = useContext(UserContext);
  const history = useHistory();
  const id = user.id;

  return (

      <Card style={{display: 'flex', alignItems: 'center'}}>
    <ProfileImg src={user.pfp} alt="User Profile img"/>
    {/* <h2>User Profile Information</h2> */}
    <CardBody style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <CardTitle tag="h4">Username: {user.username}</CardTitle>
    <CardText>Email: {user.email}</CardText>
    <CardText>Location: {user.location}</CardText>
    <Button onClick={() => history.push(`/editUser/${id}`)}>Edit Profile</Button>
    </CardBody>
    </Card>

  )
}

export default UserInfo;