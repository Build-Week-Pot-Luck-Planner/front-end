import React from 'react';
import data from '../data';
import styled from 'styled-components';

const Potluck = styled.div`
box-shadow: 5px 5px 15px black;
background-color: #f4f9e9;
border: 1px #f4f9e9 solid;
border-radius: 10px;
padding: 1rem;
max-width: 500px;
margin: 1rem 0;
text-align: center;
`

const Container = styled.div`
border: 2px #80808059 solid;
border-radius: 3px;
padding: 2%;
display: flex;
flex-wrap: wrap;
justify-content: space-evenly;
`

const DataContainer = styled.div`
display: flex;
width: 500px;
`

const ItemContainer = styled.div`
border: 1px solid black;
width: 45%
`

const DateTimeContainer = styled.div`
border: 1px solid black;
width: 45%;
`

const PotluckCard = () => {

  return (
    <Container>
    {data.map(potluck => {
      return (
        <Potluck key={potluck.id}>
      <h1>{potluck.title}</h1>
      <DataContainer>
      <ItemContainer>
      {potluck.items.map(item => {
        return(
          <li key={item}>{item}</li>
          )
        }
        )}
        </ItemContainer>
        <DateTimeContainer>
        <p>When: {potluck.datetime}</p>
        <p>Where: {potluck.location}</p>
        </DateTimeContainer>
        </DataContainer>
        <button>Edit</button>
      </Potluck>
    )})}
    </Container>
  )
}

export default PotluckCard;