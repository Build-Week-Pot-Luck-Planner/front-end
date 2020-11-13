import React, {useState} from 'react'
import SelectUSState from 'react-select-us-states';

function SignUp() {
    const [formData, setFormData] = useState({
        fName: "",
        lName: "",
        email: "",
        password: "",
        imageURL: "",
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
    })
}

const submit = (event) => {
    event.preventDefault();
    setFormData({   fName: "",
    lName: "",
    email: "",
    password: "",
    imageURL: "",
    Location: "",})
    

}
  
    return (
        <div>
            <h1>Sign Up!</h1>
            <form onSubmit={submit}>
                <label>
                First Name
                <input name="fName" type="text" onChange={onInputChange}  value={formData.fName}/>
                </label>
                <label>
                Last Name
                <input name="lName" type="text" onChange={onInputChange}  value={formData.lName}/>
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

                
                <label>
                Image Url   
                <input name="imageURL" type="text" onChange={onInputChange} value={formData.imageURL} />
                </label>



            <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default SignUp
