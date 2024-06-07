import { useEffect, useState } from 'react'
import { Task } from './types/types'
import axios from 'axios'
import { Container, Paper } from '@mui/material'

function App() {
  const paperStyle = { padding: "30px 20px", maxWidth: 600, margin: "50px auto", }
  // const [title, setTitle] = useState('')
  // const [description, setDescription] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])
  useEffect(() => {
    const getTask = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/todo`)
      setTasks(res.data)
      console.log(res.data)
    }
    getTask()
  }, [tasks])
  return (
    <>
      <Container>
          <Paper elevation={3} style={paperStyle}>
              <h2 style={{ color: "#1976d2" }}>Tasks</h2>
              {tasks.map((task,index) => (
                  <Paper elevation={3} style={{margin:"10px",padding:"15px",textAlign:"left", display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} key={index}>
                      <div>{task.title} : {task.description}</div>
                      <div>
                      </div>
                  </Paper>
              ))}
          </Paper>
      </Container>
    </>
  )
}

export default App
