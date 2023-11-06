import React, { useState } from 'react'

import { postData } from '../helper/axiosHelper'
const hourswk = 24*7;
const AddTaskForm = ({resp, setResp, totalHr, getTasks}) => {
    const [form, setForm] = useState({
        task: "",
        hr: 0,
      })

    const handelOnChange = (e) => {
        const {name, value} = e.target;
    
        resp?.message && setResp({});
        setForm({...form, [name]: value})
      }
    
      const handleOnSubmit = async(e) => {
        e.preventDefault();  
        
          if(totalHr + +form.hr > hourswk){
            return alert("Sorry You have not enough time to fit this task ")
          }
      
         const data = await postData(form);
          setResp(data);
    
          if(data.status ==='success'){
            //reset state
            setForm({task: "", hr: ""})
            //call api to fetch all the task
            getTasks();
          }
        }

        

  return (
    <form
      onSubmit={handleOnSubmit}
     
      className="mt-5 border p-5 rounded shadow-lg bg-transparent"
    >
      <div className="row g-2">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Coding.."
            aria-label="First name"
            name="task"
            value={form.task}
            onChange={handelOnChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            min="1"
            className="form-control"
            placeholder="Please enter total hour"
            aria-label="Last name"
            name="hr"
            value={form.hr}
            onChange={handelOnChange}
            required
          />
        </div>
        <div className="col-md-3">
          <div className="d-grid">
            <button className="btn btn-primary"> Add Task</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default AddTaskForm
