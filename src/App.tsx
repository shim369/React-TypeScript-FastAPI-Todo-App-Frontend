import { useEffect } from 'react'
import { Task } from './types/types'
import axios from 'axios'

function App() {
  useEffect(() => {
    const getTask = async () => {
      const res = await axios.get<Task>(`${process.env.REACT_APP_API_URL}/todo`)
      console.log(res.data);
    }
    getTask();
  },[])
  return <div></div>
}

export default App
