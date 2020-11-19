import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import SelectUSState from 'react-select-us-states';
import * as yup from 'yup'
import axios from 'axios';
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
function SignUp() {
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
            <h1>Sign Up!</h1>
            <form onSubmit={submit}>
                <label>
                Username
                {errorState.username.length > 0 ? (<p className="error">{errorState.username}</p>) : null}
                <input name="username" type="text" onChange={onInputChange}  value={formData.username}/>
                </label>
                <label>
                Email
                {errorState.email.length > 0 ? (<p className="error">{errorState.email}</p>) : null}
                <input name="email" type="text" onChange={onInputChange}  value={formData.email}/>
                </label>
                <label>
                Password
                {errorState.password.length > 0 ? (<p className="error">{errorState.password}</p>) : null}
                <input name="password" type="password" onChange={onInputChange}value={formData.password}/>
                </label>
                <label>
                <br />  Location
               <SelectUSState  onChange={statePick}/>
                </label>
            <input disabled={buttonDisabled} type="submit" value="Submit" />
            </form>
        </div>
    )
}
export default SignUp
