import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import SelectUSState from 'react-select-us-states';

const NewPotluckForm = () => {

  const history = useHistory();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    items: [],
    when: new Date(),
  })

  const changeHandler = (e) => {
    e.target.name !== "items" ? 
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    }) 
    :
    setFormData({
      ...formData,
      items: e.target.value.split(", ")
    }) 
  
    // console.log(formData)
  }

  const dateHandler = (date) => {
    setFormData({
      ...formData,
      when: date
    });
    console.log(formData)
  }

  const statePick = (newVal) => {
    setFormData({
        ...formData,
        location: newVal
    });
}

const submit = (e) => {
  e.preventDefault();
  //  add axios request to create potluck once endpoints are done
  axiosWithAuth()
    .post(`https://bw-potluckplanner.herokuapp.com/api/potlucks`, formData)
    .then(res => {
      console.log("Added New Potluck: ", res)
      history.push(`/invite/${res.data.potluck.id}`); //Add in potluck id as param so when sent to invite page can send potluck id as well
    })
    .catch(err => {
      console.log(err);
    })
}

  return (
    <div>
    <h1>Add New Potluck</h1>
    <form onSubmit={submit}>
      <input 
      type="text"
      name="title"
      id="title"
      placeholder="Title"
      value={formData.title}
      onChange={changeHandler}
      />
      <br/>

      <SelectUSState  onChange={statePick}/>
      <br/>

      <textarea 
      name="items"
      id="items"
      placeholder="Add new items separated by commas"
      value={formData.items.join(', ')}
      onChange={changeHandler}
      />
      <br/>

      <DatePicker
      selected={formData.when}
      onChange={dateHandler}
      timeInputLabel="Time:"
      dateFormat="MM/dd/yyyy h:mm aa"
      showTimeInput
    />

    <button>Submit</button>
    
    </form>
    </div>
  )
};

export default NewPotluckForm;