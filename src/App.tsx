import { useEffect, useState } from 'react'
import { Task } from './types/types'
import axios from 'axios'
import { Box, Button, Container, Paper } from '@mui/material'
import { purple, grey } from '@mui/material/colors'
import Header from './components/Header'

function App() {
  const paperStyle = {
    padding: '30px 20px',
    maxWidth: 600,
    margin: '50px auto',
  }
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
    <Box sx={{ backgroundColor: grey[100] }}>
      <Header />
      <Container>
        <Paper elevation={2} style={paperStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <h2 style={{ color: purple[900] }}>Tasks</h2>
          </Box>
          {tasks.map((task, index) => (
            <Box
              key={index}
              sx={{
                padding: '15px',
                textAlign: 'left',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: index % 2 === 0 ? purple[100] : purple[50],
              }}
            >
              <div>
                {task.title} : {task.description}
              </div>
              <div>
                <Button variant="contained" color="secondary" sx={{ margin: '0 5px', backgroundColor: purple[600] }}>
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ margin: '0 5px', backgroundColor: purple[900] }}
                >
                  Delete
                </Button>
              </div>
            </Box>
          ))}
        </Paper>
      </Container>
    </Box>
  )
}

export default App
