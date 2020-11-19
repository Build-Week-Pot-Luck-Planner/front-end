import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PotluckCard from './PotluckCard';
import UserInfo from './UserInfo';
import styled from 'styled-components';
import { PotluckContext } from '../contexts/PotluckContext';
import { UserContext } from '../contexts/UserContext';
import axiosWithAuth from '../utils/axiosWithAuth';
import UserInvites from './UserInvites';

const Container = styled.div`
border: 2px #80808059 solid;
border-radius: 3px;
padding: 2%;
display: flex;
flex-wrap: wrap;
justify-content: space-evenly;
`
const PotluckContainer = styled.div`
border: 2px #80808059 solid;
border-radius: 3px;
padding: 2%;
display: flex;
flex-wrap: wrap;
justify-content: space-evenly;
`

const UserPotluckPage = (props) => {

  const context = useContext(PotluckContext);
  const history = useHistory();
  const username = localStorage.getItem("username");

  const [user, setUser] = useState({
    email: "",
    id: "",
    location: "",
    pfp: "",
    username: "",
  });

  const [potlucks, setPotlucks] = useState([]);
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get(`https://bw-potluckplanner.herokuapp.com/api/users?username=${username}`)
      .then(res => {
        // console.log(res);
        setUser({
          ...user,
          email: res.data.users[0].email,
          id: res.data.users[0].id,
          location: res.data.users[0].location,
          pfp: res.data.users[0].pfp,
          username: res.data.users[0].username
        })
        context.userIdSetter(res.data.users[0].id);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    axiosWithAuth()
      .get(`https://bw-potluckplanner.herokuapp.com/api/users/${user.id}`)
      .then(res => {
        console.log("This is from UserPotluckPage.js", res);
        context.userDataSetter(res.data.user);
        setPotlucks(res.data.user.potlucks)
        console.log("Potlucks", potlucks);
      })
      .catch(err => {
        console.log(err);
      })
  }, [user.id])

    useEffect(() => {
    axiosWithAuth()
      .get(`https://bw-potluckplanner.herokuapp.com/api/users/${user.id}/invitations`)
      .then(res => {
        console.log('User Invitations', res);
      })
      .catch(err => {
        console.log(err);
      })
  }, [user.id])

  return (
    <>
    <UserContext.Provider value={user}>
    <UserInfo />
    <UserInvites />
    </UserContext.Provider>
    <Container>
      <h2>My Potlucks</h2>
      {
      potlucks[0] ? 
      <PotluckContainer>
        {potlucks.map(potluck => {
          return (
            <PotluckCard potluck={potluck}/>
        )})}
      </PotluckContainer> 
      : 
      <h3>Add a Potluck to begin organizing</h3>
      }
      <button onClick={() => history.push("/newPotluck")}>New Potluck</button>
    </Container>
    </>
  )
}

export default UserPotluckPage;