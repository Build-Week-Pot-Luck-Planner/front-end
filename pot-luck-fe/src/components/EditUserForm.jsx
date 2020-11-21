import React, {useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom';
import SelectUSState from 'react-select-us-states';
import axiosWithAuth from '../utils/axiosWithAuth';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from 'reactstrap';

function EditUserForm() {
    const id = useParams();

    useEffect(() => {
      axiosWithAuth()
        .get(`https://bw-potluckplanner.herokuapp.com/api/users/${id.id}`)
        .then(res => {
          console.log(res);
          setFormData({
            username: res.data.user.username,
            email: res.data.user.email,
            password: res.data.user.password,
            location: res.data.user.location,
            pfp: res.data.user.pfp,
          })
        })
        .catch(err => {
          console.log(err);
        })

    }, [])

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        location: "",
        pfp: "",
    });

    const history = useHistory();

    const onInputChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }
const statePick = (newVal) => {
    setFormData({
        ...formData,
        location: newVal
    });
    console.log("state picker data: ", formData.location);
}

const submit = (event) => {
    event.preventDefault();

    axiosWithAuth()
        .put(`https://bw-potluckplanner.herokuapp.com/api/users/${id.id}`, formData)
        .then(res => {
            console.log(res);
            console.log("Id for PUT: ", id);
        })
        .catch(err => {
            console.log(err);
            console.log(id);
        })

    setFormData({
    username: "",
    email: "",
    password: "",
    location: "",});
    
    history.push("/potlucks");
}
  
    return (
        <Container style={{display: 'flex', justifyContent: 'center'}}>
            <Row>
            <Col style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'lightgrey'}} className="mt-5">
                <h1>Edit Profile</h1>
                <form onSubmit={submit}>
                    <FormGroup >
                    <Label>
                    Username
                    <Input name="username" type="text" onChange={onInputChange}  value={formData.username}/>
                    </Label>
                    </FormGroup>

                    <FormGroup >
                    <Label>
                    Email
                    <Input name="email" type="text" onChange={onInputChange}  value={formData.email}/>
                    </Label>
                    </FormGroup>

                    <FormGroup >
                    <Label>
                    Password
                    <Input name="password" type="password" onChange={onInputChange}value={formData.password}/>
                    </Label>
                    </FormGroup>

                    <FormGroup >
                    <Label>
                    Profile Picture URL
                    <Input name="pfp" type="text" onChange={onInputChange}value={formData.pfp}/>
                    </Label>
                    </FormGroup>

                    <FormGroup >
                    <Label>
                    Location
                <SelectUSState  onChange={statePick}/>
                    </Label>
                    </FormGroup>

                <Input className="mb-3 mt-2" type="submit" value="Submit" />
                </form>
            </Col>
            </Row>
        </Container>
    )
}

export default EditUserForm;