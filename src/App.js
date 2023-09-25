import { useState } from 'react';
import './App.css';

function App() {

  const [form, setForm] = useState({
    task: "",
    hr: 0,
  })

  const [taskList, setTaskList] = useState([]);


  const handelOnChange = (e) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value})
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();  

    const obj = {
      ...form,
      type: "entry",
      id: randomStr(),
    }

    setTaskList([...taskList, obj])
    setForm({form})
  }

  const handleOnDelete =(id, task) => {
    
    if(window.confirm(`Are you sure want to delete ${task}?`)){
      const filteredArg = taskList.filter((item) => item.id !== id)
      setTaskList(filteredArg);
    }
  }
  const entry = taskList.filter(item => item.type === "entry");
  const bad = taskList.filter(item => item.type === "bad")

  const switchTask =(id, type) => {
    const arg = taskList.map((item) => {
      if(item.id === id) {
        return {
          ...item, type,
        }
      }
      return item;
    });
    setTaskList(arg)
  }
   console.log(taskList)

  const randomStr = () => {
    const charLength = 6;
    const str = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";
    let id = "";
  
    for (let i = 0; i < charLength; i++) {
      const randNum = Math.round(Math.random() * (str.length - 1));
      id += str[randNum];
    }
  
    return id;
  };

  return <div className="wrapper">
  <div className="container">
    {/* <!-- top title  --> */}
    <div className="row g-2">
      <div className="col mt-5 text-center">
        <h1>Not to do list</h1>
      </div>
    </div>

    {/* <!-- form  --> */}
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
            onChange={handelOnChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            min="1"
            className="form-control"
            placeholder="23"
            aria-label="Last name"
            name="hr"
            onChange={handelOnChange}
            required
          />
        </div>
        <div className="col-md-3">
          <div className="d-grid">
            <button className="btn btn-primary">Add Task</button>
          </div>
        </div>
      </div>
    </form>

    {/* <!-- table area  --> */}
    <div className="row mt-5 pt-2">
      {/* <!-- 1. entry list --> */}
      <div className="col-md">
        <h3 className="text-center">Task Entry List</h3>
        <hr />
        <table className="table table-striped table-hover border opacity">
          <tbody id="entry">

            {
              entry.map((item, i) => {
                return <tr>
            <td>{i + 1}</td>
            <td>{item.task}</td>
            <td>{item.hr}hr</td>
            <td class="text-end">
              <button onClick = {() => handleOnDelete(item.id, item.task)}
              class="btn btn-danger">
                <i class="fa-solid fa-trash"></i>
              </button>
              <button
              onClick={() =>switchTask(item.id, "bad")}
              class="btn btn-success">
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </td>
            </tr>
              })}
          </tbody>
        </table>
      </div>

      {/* <!-- 2. bad list  --> */}
      <div className="col-md">
        <h3 className="text-center">Bad List</h3>
        <hr />
        <table className="table table-striped table-hover border opacity">
          <tbody id="bad">
          {
              bad.map((item, i) => {
                return <tr>
            <td>{i + 1}</td>
            <td>{item.task}</td>
            <td>{item.hr}hr</td>
            <td class="text-end">
              <button onClick = {() => handleOnDelete(item.id, item.task)}
              class="btn btn-danger">
                <i class="fa-solid fa-trash"></i>
              </button>
              <button
              onClick={() =>switchTask(item.id, "entry")}
              class="btn btn-success">
                <i class="fa-solid fa-arrow-left"></i>
              </button>
            </td>
            </tr>
              })}
          </tbody>
        </table>
        <div className="alert alert-info">
          You could have save = <span id="badHr">0</span>hr
        </div>
      </div>
    </div>

    {/* <!-- toat time allocated --> */}
    <div className="alert alert-info">
      Total hrs per week allocated = <span id="totalHr">0</span>hr
    </div>
  </div>
</div>
}

export default App;
