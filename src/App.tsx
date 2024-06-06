import { useEffect, useState } from 'react'
import { Task } from './types/types'
import axios from 'axios'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  useEffect(() => {
    const getTask = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/todo`)
      setTasks(res.data)
      console.log(res.data)
    }
    getTask()
  }, [])
  return (
    <>
      {tasks.map((task) => (
        <div key={task.id}>
          <p>{task.title}</p>
          <p>{task.description}</p>
        </div>
      ))}
    </>
  )
}

export default App
