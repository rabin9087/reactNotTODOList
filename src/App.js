import { useEffect, useState } from 'react';
import './App.css';
import { deleteTask, getAllTasks, updateTask } from './helper/axiosHelper';
import AddTaskForm from './Components/AddTaskForm';
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
    
  const handleOnDelete = async() => {
    if(window.confirm(`Are you sure want to delete ${idsToDelete.length}?`)){
      const result = await deleteTask({ids: idsToDelete});
    setResp(result);

    result?.status ==='success' && getTasks() && setIdsToDelete([])
    }
    
  }

  const handelOnCheck = (e) => {
    const {checked, value} = e.target;

    console.log(checked, value)

    const temArg = idsToDelete.filter((itm) => itm !== value);

    if(checked){
      //push in to idsToDelete
      temArg.push(value);

    }
    setIdsToDelete(temArg);
  }

  const entry = taskList.filter(item => item.type === "entry");
  const bad = taskList.filter(item => item.type === "bad");

  const switchTask = async(obj) => {
    console.log(obj);

    //send update to the server
    const result = await updateTask(obj);
    setResp(result);
    //if success, fetch all the data

    result?.status === 'success' && getTasks();

  }

  const handelOnAllCheck = (e) => {
    const {checked, value} = e.target;
    console.log(checked, value)

    if(value === 'entry'){
      const entryIds = entry.map((item) => item._id);
      console.log(entryIds);
      if (checked){
        //if checked add the ids to idsToDelete
        setIdsToDelete([...idsToDelete, ...entryIds] )
      } else{
       //else remove entryIds from the idsToDelete
       const tempArIds = idsToDelete.filter((id) => !entryIds.includes(id));
       setIdsToDelete(tempArIds);
      }
    } else {
      const badIds = bad.map((item)=> item._id)

      if(checked){
        setIdsToDelete([...idsToDelete, ...badIds])
      } else {
        const tempAryIds = idsToDelete.filter((id) => !badIds.includes(id));
        setIdsToDelete(tempAryIds);
      }
    }

  }

  return <div className="wrapper">
  <div className="container">
    {/* <!-- top title  --> */}
    <div className="row g-2">
      <div className="col mt-5 text-center">
        <h1>Not to do list</h1>
      </div>
    </div>

    {/* <!-- form  --> */}

    {/* show the server message */}

    {
      resp?.message && <div className={resp?.status === 'success' ? 'alert alert-success': 'alert alert-danger'}>
        {resp?.message}
      </div> 
    }
    
    <AddTaskForm resp={resp} setResp={setResp} totalHr= {totalHr}/>

    {/* <!-- table area  --> */}
    <div className="row mt-5 pt-2">
      {/* <!-- 1. entry list --> */}
      <div className="col-md">
        <h3 className="text-center">Task Entry List</h3>
        <hr />

        { entry.length>0 && (<div className='m-2'>
              <input class="form-check-input" type="checkbox" value='entry' onChange={handelOnAllCheck}/>
              { " "} <label htmlFor=''>Select all Entry </label> 
          </div>)}

        <table className="table table-striped table-hover border opacity">
          <tbody id="entry">
          
            {
              entry.map((item, i) => {
                
                return <tr key={item._id}>
            <td>{i + 1}</td>
            <td>{" "} 
              <input class="form-check-input" type="checkbox" 
              onChange={handelOnCheck} 
              checked = {idsToDelete.includes(item._id)}
              value={item._id}/>{" "}
              {item.task}</td>
            <td>{item.hr}hr</td>
            <td class="text-end">
              <button
              onClick={() =>switchTask({_id:item._id, type:"bad"})}
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

        {bad.length>0 && (<div className='m-2'>
              <input class="form-check-input" type="checkbox" 
              value='bad' onChange={handelOnAllCheck}/> {" "}
              <label htmlFor=''>Select all Bad List </label> 
          </div>)}

        <table className="table table-striped table-hover border opacity">
          <tbody id="bad">
         
          {
              bad.map((item, i) => {
                return <tr key={i}>
  
            <td>{i + 1}</td>
            <td> {" "}
              <input class="form-check-input" type="checkbox" onChange={handelOnCheck} 
              checked = {idsToDelete.includes(item._id)}
              value={item._id}/>{" "}
              {item.task}</td>
            <td>{item.hr}hr</td>
            <td class="text-end">
              <button
              onClick={() =>switchTask({_id:item._id, type:"entry"})}
              class="btn btn-info">
                <i class="fa-solid fa-arrow-left"></i>
              </button>
            </td>
            </tr>
              })}
          </tbody>
        </table>
        <div className="alert alert-warning">
          You could have save = <span id="badHr">
          {bad.reduce((acc, item) => acc+ +item.hr, 0)}
          </span>hr
        </div>
      </div>
    </div>

              {idsToDelete.length > 0 && 
              <div className='d-grid mb-2'>
              <button onClick = {() => handleOnDelete()}
                        class="btn btn-danger">
                          <i class="fa-solid fa-trash"></i>
                          Delete {idsToDelete.length} tasks
                        </button>
              </div>
              }

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
