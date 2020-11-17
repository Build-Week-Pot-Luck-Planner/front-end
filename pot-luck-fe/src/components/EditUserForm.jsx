import React, {useState, useContext, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom';
import SelectUSState from 'react-select-us-states';
import axiosWithAuth from '../utils/axiosWithAuth';
// import { UserContext } from '../contexts/UserContext';


function EditUserForm() {
    // const user = useContext(UserContext);
    const id = useParams();

    useEffect(() => {
      axiosWithAuth()
        .get(`https://bw-potluckplanner.herokuapp.com/api/users/${id.id}`)
        .then(res => {
          console.log(res);
          setFormData({
            username: res.data.user.username,
            email: res.data.user.email,
            password: res.data.user.password,
            location: res.data.user.location,
            pfp: res.data.user.pfp,
          })
        })
        .catch(err => {
          console.log(err);
        })

    }, [])

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        location: "",
        pfp: "",
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
        location: newVal
    });
    console.log("state picker data: ", formData.location);
}

const submit = (event) => {
    event.preventDefault();

    axiosWithAuth()
        .put(`https://bw-potluckplanner.herokuapp.com/api/users/${id.id}`, formData)
        .then(res => {
            console.log(res);
            console.log("Id for PUT: ", id);
        })
        .catch(err => {
            console.log(err);
            console.log(id);
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
            <h1>Edit Profile</h1>
            <form onSubmit={submit}>
                <label>
                Username
                <input name="username" type="text" onChange={onInputChange}  value={formData.username}/>
                </label>
                <br />
                <label>
                Email
                <input name="email" type="text" onChange={onInputChange}  value={formData.email}/>
                </label>
                <br />
                <label>
                Password
                <input name="password" type="password" onChange={onInputChange}value={formData.password}/>
                </label>
                <br />
                <label>
                Profile Picture URL
                <input name="pfp" type="text" onChange={onInputChange}value={formData.pfp}/>
                </label>
                <br />
                <label>
                <br />  Location
               <SelectUSState  onChange={statePick}/>
      
               
                </label>

            <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default EditUserForm;