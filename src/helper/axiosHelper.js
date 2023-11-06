import axios from 'axios';

const apiEP = "http://localhost:8000/api/v2/task"
export const postData = async(obj) => {
    try {
        const {data} = await axios.post(apiEP, obj);
        
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getAllTasks = async() => {
    try {
        const {data} = await axios.get(apiEP);
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const updateTask = async(obj) => {
    try {
        const {data} = await axios.patch(apiEP, obj);
        console.log(data);
        return data;
        
    } catch (error) {
        console.log(error);
    }
}

export const deleteTask = async(taskArg) => {
    try {
        const {data} = await axios.delete(apiEP, {data: taskArg});
        console.log(data);
        return data;
        
    } catch (error) {
        console.log(error);
    }
}