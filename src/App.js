import { useEffect, useState } from 'react';
import './App.css';
import { getAllTasks, updateTask } from './helper/axiosHelper';
import AddTaskForm from './Components/AddTaskForm';
import TaskList from './Components/TaskList';
function App() {


  const [taskList, setTaskList] = useState([]);

  const [resp, setResp] = useState({
  })

  const [idsToDelete, setIdsToDelete] = useState([]);

  const totalHr = taskList.reduce((acc, item) => acc + +item.hr, 0)

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async() => {
    const data = await getAllTasks();
    data?.status === "success" && setTaskList(data.taskList)
  }
    
  const entry = taskList.filter(item => item.type === "entry");
  const bad = taskList.filter(item => item.type === "bad");

  
  return <div className="wrapper">
  <div className="container">
    {/* <!-- top title  --> */}
    <div className="row g-2">
      <div className="col mt-5 text-center">
        <h1>Not to do list</h1>
      </div>
    </div>

   

    {/* show the server message */}

    {
      resp?.message && <div className={resp?.status === 'success' ? 'alert alert-success': 'alert alert-danger'}>
        {resp?.message}
      </div> 
    }
     {/* <!-- form  --> */}
    <AddTaskForm resp={resp} setResp={setResp} totalHr= {totalHr} getTasks= {getTasks}/>

    {/* <!-- table area  --> */}
    
    <TaskList idsToDelete = {idsToDelete} setIdsToDelete= {setIdsToDelete} entry= {entry} bad = {bad} getTasks= {getTasks}
    setResp = {setResp} updateTask = {updateTask} />

    {/* <!-- toat time allocated --> */}
    <div className="alert alert-info">
      Total hrs per week allocated = <span id="totalHr">
        {totalHr}
        </span>hr
    </div>
  </div>
</div>
}

export default App;
