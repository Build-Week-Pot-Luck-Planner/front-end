import React, { useEffect } from 'react';
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

const PotluckCard = (props) => {


  return (
    <>
        <Potluck key={props.potluck.potluckId}>
      <h2>{props.potluck.title}</h2>
      <DataContainer>
      {/* <ItemContainer> */}
        {/* <h3>Items to Bring</h3>
      {props.potluck.items.map(item => {
        return(
          <li key={item}>{item}</li>
          )
        }
        )} */}
        {/* </ItemContainer> */}
        <DateTimeContainer>
        <p>When: {props.potluck.when}</p>
        </DateTimeContainer>
        <DateTimeContainer>
        <p>Where: {props.potluck.location}</p>
        </DateTimeContainer>
        </DataContainer>
        <button>Edit</button>
      </Potluck>
    
    </>
  )
}

export default PotluckCard;