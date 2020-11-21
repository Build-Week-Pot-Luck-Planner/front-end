import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from 'reactstrap';

function Login() {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const history = useHistory();

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            
        
        });
    }

    const onSub = e => {
        e.preventDefault();
        localStorage.setItem("username", formData.username);
        axios 
            .post(`https://bw-potluckplanner.herokuapp.com/api/auth/login`, formData)
            .then(res => {
                console.log(res);
                localStorage.setItem("token", res.data.token)
                history.push("/potlucks");
            })
            .catch(err => {
                console.log(err)
            });

        setFormData({
            username: '',
            password: '',
        })

    }

    return (
        <Container style={{display: 'flex', justifyContent: 'center'}}>
            <Row>
                <Col style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'lightgrey'}} className="mt-5">
                    <h1>Login</h1>
                    <form onSubmit={onSub} >
                    <FormGroup >
                        <Label  for="username"> Username
                        <Input  type='text' name='username' onChange={onChange} value={formData.username}/>
                        </Label>
                    </FormGroup>
                    
                    <FormGroup >
                        <Label for="password"> Password
                            <Input name='password' type='password' onChange={onChange} value={formData.password} />
                        </Label>
                    </FormGroup>
                    <Input className="mb-3 mt-2" type='submit' value='submit' />
                    </form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;
