import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import SelectUSState from 'react-select-us-states';

const NewPotluckForm = () => {

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    items: [],
    date: new Date(),
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
  
    console.log(formData)
  }

  const dateHandler = (date) => {
    setFormData({
      ...formData,
      date: date
    });
    console.log(formData)
  }

  const statePick = (newVal) => {
    setFormData({
        ...formData,
        location: newVal
    });
}

  return (
    <div>
    <h1>Add New Potluck</h1>
    <form>
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
      selected={formData.date}
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