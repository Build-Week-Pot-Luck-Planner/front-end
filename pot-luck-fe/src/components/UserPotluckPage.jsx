import React, { useContext } from 'react';
import PotluckCard from './PotluckCard';
import UserInfo from './UserInfo';
import { userData } from '../data';
import styled from 'styled-components';
import { PotluckContext } from '../contexts/PotluckContext';

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

  return (
    <>
    <UserInfo user={userData}/>
    <Container>
      <h2>My Potlucks</h2>
      <PotluckContainer>
      {potluck.map(potluck => {
      return (
        <PotluckCard potluck={potluck}/>
        )})}
      </PotluckContainer>
      <button>New Potluck</button>
    </Container>
    </>
  )
}

export default UserPotluckPage;