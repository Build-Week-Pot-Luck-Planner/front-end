import React, {useState} from 'react'

function Login() {

    const [formData, setFormData] = useState({
        email: '',
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
        setFormData({
            email: '',
            password: '',
        })
    }

    return (
        <div>
            <form onSubmit={onSub} >
            <h1>Login</h1>
            <label  >
                email
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
