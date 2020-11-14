import React from 'react';

const UserInfo = (props) => {

  return (
    <div>
    <h2>User Profile Information</h2>
    <h3>Username: {props.user.username}</h3>
    <p>Email: {props.user.email}</p>
    <p>Location: {props.user.location}</p>
    <button>Edit Profile</button>
    </div>
  )
}

export default UserInfo;