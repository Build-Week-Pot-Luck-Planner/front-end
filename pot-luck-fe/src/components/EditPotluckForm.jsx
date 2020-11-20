import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import SelectUSState from 'react-select-us-states';
import Item from './Item';
import { useParams } from 'react-router-dom';

const EditPotluckForm = (props) => {

  const id = useParams();
  // console.log(id)
  
 const [formData, setFormData] = useState({
    title: props.potluck.title,
    location: props.potluck.location,
    items: [],
    when: new Date(props.potluck.when),
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
  
  }

  const dateHandler = (date) => {
    setFormData({
      ...formData,
      when: date
    });
    // console.log(formData)
  }

  const statePick = (newVal) => {
    setFormData({
        ...formData,
        location: newVal
    });
}

const submit = (e) => {
  e.preventDefault();
  axiosWithAuth()
    .put(`https://bw-potluckplanner.herokuapp.com/api/potlucks/${id.potluckId}`, formData)
    .then(res => {
      console.log("Updated Potluck: ", res)
      props.setPotluck(res.data);
      props.setEditing(false);
      props.setEdited(!props.edited)
    })
    .catch(err => {
      console.log(err);
    })
}

  return (
    <div>
    <h1>Edit Potluck</h1>
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

    <button onSubmit={submit}>Submit</button>
    
    </form>
    </div>
  )
}

export default EditPotluckForm;