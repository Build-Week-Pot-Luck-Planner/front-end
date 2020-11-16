import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const NewPotluckForm = () => {
  // const [startDate, setStartDate] = useState(new Date());

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    items: "",
    date: new Date(),
  })

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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

      <input 
      type="text"
      name="location"
      id="location"
      placeholder="Location"
      value={formData.location}
      onChange={changeHandler}
      />
      <br/>

      <textarea 
      name="items"
      id="items"
      placeholder="Add new items separated by commas"
      value={formData.items}
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