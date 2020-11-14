import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const NewPotluckForm = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
    <h1>Add New Potluck</h1>
    <form>
      <input 
      type="text"
      name="title"
      id="title"
      placeholder="Title"
      />
      <br/>

      <input 
      type="text"
      name="location"
      id="location"
      placeholder="Location"
      />
      <br/>

      <textarea 
      name="items"
      id="items"
      placeholder="Add new items separated by commas"
      />
      <br/>

      <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
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