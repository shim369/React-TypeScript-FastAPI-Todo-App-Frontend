import { useEffect, useState } from 'react'
import { Task } from './types/types'
import axios from 'axios'
import { Box, Button, Container, Paper } from '@mui/material'
import { blue } from '@mui/material/colors'
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
    <>
      <Header />
      <Container>
        <Paper elevation={2} style={paperStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <h2 style={{ color: '#1976d2' }}>Tasks</h2>
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
                backgroundColor: index % 2 === 0 ? blue[50] : 'white',
              }}
            >
              <div>
                {task.title} : {task.description}
              </div>
              <div>
                <Button variant="contained" sx={{ margin: '0 5px' }}>
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ margin: '0 5px' }}
                >
                  Delete
                </Button>
              </div>
            </Box>
          ))}
        </Paper>
      </Container>
    </>
  )
}

export default App
