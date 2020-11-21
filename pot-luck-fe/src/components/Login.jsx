import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Spinner, Container, Row, Col } from 'reactstrap';

function Login() {

    const [loggingIn, setLoggingIn] = useState(false)

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
        setLoggingIn(true);
        localStorage.setItem("username", formData.username);
        axios 
            .post(`https://bw-potluckplanner.herokuapp.com/api/auth/login`, formData)
            .then(res => {
                console.log(res);
                localStorage.setItem("token", res.data.token)
                history.push("/potlucks");
                setLoggingIn(false)
            })
            .catch(err => {
                console.log(err)
                setLoggingIn(false)
            });

        setFormData({
            username: '',
            password: '',
        })

    }

    return (
        <div>
        {!loggingIn ?
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
        : 
                <Container >
            <Row>
                <Col style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} className="mt-5">
                    <h1>Logging In...</h1>
                    <Spinner style={{ width: '4rem', height: '4rem' }} color="primary" />
                </Col>
            </Row>
        </Container>
        
    }
        </div>
    )
}

export default Login;
