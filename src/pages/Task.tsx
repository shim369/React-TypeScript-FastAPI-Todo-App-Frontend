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
      <div>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <h2 style={{ color: purple[900] }}>Tasks</h2>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: purple[400] }}>
                <TableCell sx={{ width: '30%', textAlign: 'center', color: 'white' }}>Title</TableCell>
                <TableCell sx={{ width: '30%', textAlign: 'center', color: 'white' }}>URL</TableCell>
                <TableCell sx={{ width: '10%', textAlign: 'center', color: 'white' }}>Deadline</TableCell>
                <TableCell sx={{ width: '30%', textAlign: 'center', color: 'white' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task, index) => (
                <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? purple[50] : purple[100] }}>
                  <TableCell>
                    {task.title}
                  </TableCell>
                  <TableCell><a href={task.url} target="_blank" rel="noopener noreferrer">{task.url}</a></TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{new Date(task.deadline).toLocaleDateString()}</TableCell>
                  <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
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
      </div>
    </Container>
  )
}

export default Post
