import React, {useState} from 'react'
import axiosWithAuth from "../utils/axiosWithAuth";

function Login() {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            
        
        });
    }

    const onSub = e => {
        e.preventDefault();
        // setting up for sending POST once I have the deployed backend endpoint
        /* axiosWithAuth() 
                .post(``, formData)
        */

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
