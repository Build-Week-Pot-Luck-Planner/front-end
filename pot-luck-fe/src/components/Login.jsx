import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
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
        <div>
            <form onSubmit={onSub} >
            <h1>Login</h1>
            <label  >
                username
            <input  type='text' name='username' onChange={onChange} value={formData.username}/>
            
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
