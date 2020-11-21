import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

const Potluck = styled.div`
box-shadow: 5px 5px 15px black;
background-color: lightgrey;
border-radius: 10px;
padding: 1rem;
max-width: 500px;
margin: 1rem;
text-align: center;
`

// const DataContainer = styled.div`
// display: flex;
// width: 450px;
// `

// const DateTimeContainer = styled.div`
// border: 1px solid black;
// width: 45%;
// `

const PotluckCard = (props) => {

  const potluckId = props.potluck.potluckId;
  const history = useHistory();

  return (
    <Card style={{border: 'none'}}>
      <Potluck key={props.potluck.potluckId}>
      <CardTitle tag="h2">{props.potluck.title}</CardTitle>
      {/* <DataContainer> */}
        {/* <DateTimeContainer> */}
        <Row>
        <Col sm="12">
          <Card body className="text-center" style={{backgroundColor: 'lightgrey', border: 'none'}}>
          <CardText>Where: {props.potluck.location}</CardText>
          <CardText style={{margin: '0'}}>When: </CardText>
          <DatePicker
            selected={new Date(props.potluck.when)}
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy h:mm aa"
            showTimeInput
            disabled
          />
          </Card>
          </Col>
          </Row>
        {/* </DateTimeContainer> */}
        {/* <Row> */}
        {/* <Col sm="12"> */}
        {/* <DateTimeContainer> */}
        {/* <Card body className="text-center"> */}
          {/* <CardText>Where: {props.potluck.location}</CardText> */}
        {/* </Card> */}
        {/* </DateTimeContainer> */}
          {/* </Col> */}
          {/* </Row> */}
        {/* </DataContainer> */}
          <Button style={{marginTop: '15px'}} onClick={() => history.push(`/potlucks/${potluckId}`)}>See details</Button>
      </Potluck>
    
    </Card>
  )
}

export default PotluckCard;