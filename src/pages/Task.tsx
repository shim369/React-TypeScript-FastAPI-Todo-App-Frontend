import { useEffect, useState } from 'react'
import { Task } from '../types/types'
import axios from 'axios'
import { Box, Button, Container, Paper } from '@mui/material'
import { purple } from '@mui/material/colors'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

function Post() {
  const paperStyle = {
    padding: '30px 20px',
    maxWidth: 800,
    margin: '30px auto',
  }

  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const getTask = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/todo`)
        setTasks(res.data)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    }
    getTask()
  }, [])

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <h2 style={{ color: purple[900] }}>Tasks</h2>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Deadline</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {task.title}
                  </TableCell>
                  <TableCell>{task.url}</TableCell>
                  <TableCell>{new Date(task.deadline).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{
                        margin: '0 5px',
                        backgroundColor: purple[600],
                        ':hover': {
                          backgroundColor: purple[700],
                        },
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        margin: '0 5px',
                        backgroundColor: purple[800],
                        ':hover': {
                          backgroundColor: purple[900],
                        },
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  )
}

export default Post
