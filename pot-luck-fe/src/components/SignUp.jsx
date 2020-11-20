import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import SelectUSState from 'react-select-us-states';
import * as yup from 'yup'
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from 'reactstrap';
const formSchema = yup.object().shape({
    username: yup.string()
    .min(6, "username must be at least 6 characters")
    .required("Name is Required"),
    email: yup.string()
    .email()
    .required('You must enter a valid email'),
    password: yup.string()
    .min(8, "Password must be at least 8 characters")
  });
const SignUp = props  => {
  
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        location: "",
    });
    const [errorState, setErrorState] = useState({
        username: "",
        email: "",
        password: ""
        
      });
      const [buttonDisabled, setButtonDisabled] = useState(true);
      const validate = (e) => {
        let value = e.target.value;
        yup
          .reach(formSchema, e.target.name)
          .validate(value)
          .then((valid) => {
            setErrorState({
              ...errorState,
              [e.target.name]: ""
            });
          })
          .catch((err) => {
            setErrorState({
              ...errorState,
              [e.target.name]: err.errors[0]
            });
          });
      };
      useEffect(() => {
        formSchema.isValid(formData).then((valid) => {
          setButtonDisabled(!valid);
        });
      }, [formData]);
    const history = useHistory();

    const onInputChange = event => {
        event.persist();
        validate(event);
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

    axios
        // .get(`https://bw-potluckplanner.herokuapp.com/api`)
        .post(`https://bw-potluckplanner.herokuapp.com/api/auth/signup`, formData)
        .then(res => {
            console.log(res);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", formData.username);
        })
        .catch(err => {
            console.log(err);
        })
    setFormData({
    username: "",
    email: "",
    password: "",
    location: "",});
    
    history.push("/potlucks");
}
    return (
        <div>
       {/* <h1>Need a random meal idea to try? <a href={props.useless.data.meals[0].strSource} target="_blank">Click here to find a random meal to make</a> </h1> Hiding as this works and completes Unit 2 rubric item */} 
          <Container>
            <Row>
              <Col className="bg-primary mt-5">
            <h1>Sign Up!</h1>   
               <form  onSubmit={submit}>
              <FormGroup >
                  <Label  for="username">
                  Username
                  <Input  className="w-100" name="username" type="text" onChange={onInputChange}  value={formData.username}/>
                  </Label>
                  {errorState.username.length > 0 ? (<p className="error text-white">{errorState.username}</p>) : null}
                </FormGroup>
              <FormGroup>
                <Label for="email">
                Email
                <Input name="email" type="text" onChange={onInputChange}  value={formData.email}/>
                </Label>
                {errorState.email.length > 0 ? (<p className="error text-white">{errorState.email}</p>) : null}
                </FormGroup>
                <FormGroup>
                <Label for="password">
                Password      
                <Input name="password" type="password" onChange={onInputChange}value={formData.password}/>    
                </Label>
                {errorState.password.length > 0 ? (<p className="text-white error">{errorState.password}</p>) : null}
                </FormGroup>
                <Label>
                Select the state you reside in
                <br />
               <SelectUSState  onChange={statePick}/>
                </Label>
            <Input style={buttonDisabled ? {backgroundColor: 'red', color: 'white'} : {backgroundColor: 'white'}}  className="mb-3 mt-2" disabled={buttonDisabled} type="submit" value={buttonDisabled ? 'You must finish filling out the form to register' : 'submit'} />
            </form>  
                </Col>
              </Row>
            </Container>
        </div>
    )
}
export default SignUp
