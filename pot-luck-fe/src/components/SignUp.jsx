import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import SelectUSState from 'react-select-us-states';
import axios from 'axios';

function SignUp() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        location: "",
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
        [formData.location]: newVal
    });
}

const submit = (event) => {
    event.preventDefault();

    // waiting for backend endpoint URLs
    axios
        // .get(`https://bw-potluckplanner.herokuapp.com/api`)
        .post(`https://bw-potluckplanner.herokuapp.com/api/signup`, formData)
        .then(res => {
            console.log(res);
            // localStorage.setItem("token", res.data);
        })
        .catch(err => {
            console.log(err);
        })

    setFormData({
    username: "",
    email: "",
    password: "",
    location: "",});
    
    // history.push("/potlucks");
}
  
    return (
        <div>
            <h1>Sign Up!</h1>
            <form onSubmit={submit}>
                <label>
                Username
                <input name="username" type="text" onChange={onInputChange}  value={formData.username}/>
                </label>
                <label>
                Email
                <input name="email" type="text" onChange={onInputChange}  value={formData.email}/>
                </label>
                <label>
                Password
                <input name="password" type="password" onChange={onInputChange}value={formData.password}/>
                </label>
                <label>
                <br />  Location
               <SelectUSState  onChange={statePick}/>
      
               
                </label>

            <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default SignUp
