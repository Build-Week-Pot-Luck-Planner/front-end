import React from 'react';
import styled from 'styled-components';

const Potluck = styled.div`
box-shadow: 5px 5px 15px black;
background-color: #f4f9e9;
border: 1px #f4f9e9 solid;
border-radius: 10px;
padding: 1rem;
max-width: 500px;
margin: 1rem;
text-align: center;
`

const DataContainer = styled.div`
display: flex;
width: 450px;
`

const DateTimeContainer = styled.div`
border: 1px solid black;
width: 45%;
`

const PotluckCard = (props) => {

  // const formattedDate = new Date(props.potluck.when);
  const formattedDate = (props.potluck.when);


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
        <p>When: {formattedDate}</p>
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