import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../contexts/UserContext';
import axiosWithAuth from '../utils/axiosWithAuth';

const ProfileImg = styled.img`
margin-top: 2%;
border-radius: 100%;
height: 100px;
`

const UserInfo = () => {

  const user = useContext(UserContext);
  const history = useHistory();
  const id = user.id;

  return (
    <div>
    <ProfileImg src={user.pfp} alt="User Profile img"/>
    {/* <h2>User Profile Information</h2> */}
    <h3>Username: {user.username}</h3>
    <p>Email: {user.email}</p>
    <p>Location: {user.location}</p>
    <button onClick={() => history.push(`/editUser/${id}`)}>Edit Profile</button>
    </div>
  )
}

export default UserInfo;