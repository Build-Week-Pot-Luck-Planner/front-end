import React, {useState} from 'react'
import SelectUSState from 'react-select-us-states';

function SignUp() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        Location: "",
    });

    const onInputChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
            
        
        });
    }
const statePick = (newVal) => {
    setFormData({
        ...formData,
        [formData.Location]: newVal
    });
}

const submit = (event) => {
    event.preventDefault();
    setFormData({
    username: "",
    email: "",
    password: "",
    Location: "",});
    

}
  
    return (
        <div>
            <h1>Sign Up!</h1>
            <form onSubmit={submit}>
                <label>
                Username
                <input name="fName" type="text" onChange={onInputChange}  value={formData.fName}/>
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
