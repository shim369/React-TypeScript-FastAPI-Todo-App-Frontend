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
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {task.title}
                  </TableCell>
                  <TableCell align="center">{task.description}</TableCell>
                  <TableCell align="center">
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
