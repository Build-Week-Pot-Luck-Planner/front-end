import React from 'react';
import styled from 'styled-components';

const ProfileImg = styled.img`
margin-top: 2%;
border-radius: 100%;
height: 100px;
`

const UserInfo = (props) => {

  return (
    <div>
    <ProfileImg src={props.user.pfp} alt="User Profile img"/>
    {/* <h2>User Profile Information</h2> */}
    <h3>Username: {props.user.username}</h3>
    <p>Email: {props.user.email}</p>
    <p>Location: {props.user.location}</p>
    <button>Edit Profile</button>
    </div>
  )
}

export default UserInfo;