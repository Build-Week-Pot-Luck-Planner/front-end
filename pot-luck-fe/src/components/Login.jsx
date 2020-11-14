import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
// import axiosWithAuth from "../utils/axiosWithAuth";
import axios from 'axios';

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
        // setting up for sending POST once I have the deployed backend endpoint
        axios 
            .post(`https://bw-potluckplanner.herokuapp.com/api/login`, formData)
            .then(res => {
                console.log(res);
                // localStorage.setItem("token", ?res.data?)
            })
            .catch(err => {
                console.log(err)
            });

        setFormData({
            username: '',
            password: '',
        })

        // history.push("/potlucks");
    }

    return (
        <div>
            <form onSubmit={onSub} >
            <h1>Login</h1>
            <label  >
                username
            <input  type='text' name='email' onChange={onChange} value={formData.email}/>
            
            </label>
            <label>
                Password
                <input name='password' type='password' onChange={onChange} value={formData.password} />
            </label>
            <input type='submit' value='submit' />
            </form>

        </div>
    )
}

export default Login;
