import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PotluckCard from './PotluckCard';
import UserInfo from './UserInfo';
import styled from 'styled-components';
import { PotluckContext } from '../contexts/PotluckContext';
import axiosWithAuth from '../utils/axiosWithAuth';

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

const UserPotluckPage = () => {

  const potluck = useContext(PotluckContext);
  const history = useHistory();
  const username = localStorage.getItem("username");

  const [user, setUser] = useState({
    email: "",
    id: "",
    location: "",
    pfp: "",
    username: ""
  });

  const [potlucks, setPotlucks] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get(`https://bw-potluckplanner.herokuapp.com/api/users?username=${username}`)
      .then(res => {
        console.log(res);
        setUser({
          ...user,
          email: res.data.users[0].email,
          id: res.data.users[0].id,
          location: res.data.users[0].location,
          pfp: res.data.users[0].pfp,
          username: res.data.users[0].username
        })
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  return (
    <>
    <UserInfo user={user}/>
    <Container>
      <h2>My Potlucks</h2>
      {
        potlucks[0] ? 
      <PotluckContainer>
      {potluck.map(potluck => {
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