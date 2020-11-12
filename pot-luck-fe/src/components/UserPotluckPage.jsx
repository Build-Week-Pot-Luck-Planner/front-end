import React from 'react';
import data from '../data';
import styled from 'styled-components';

const Potluck = styled.div`
border: 1px solid black;
display: flex;
flex-direction: column;
align-items: center;
width: 20%;
margin: 0 auto;
`

const UserPotluckPage = () => {

  return (
    data.map(potluck => {
      return (
        <Potluck>
      <h1>{potluck.title}</h1>
      {potluck.items.map(item => {
        return(
          <ul>{item}</ul>
          )
        }
        )}
        <p>{potluck.datetime}</p>
        <p>{potluck.location}</p>
      </Potluck>
    )})
  )
}

export default UserPotluckPage;