import { useEffect, useState } from 'react'
import { TaskTypes } from '../types/types'
import axios from 'axios'
import { Box, Container, Paper, IconButton } from '@mui/material'
import { purple } from '@mui/material/colors'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

export default function Task() {
  const [tasks, setTasks] = useState<TaskTypes[]>([])

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
  }, [tasks])

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this task?')) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/todo/${id}`)
        .catch((error) => {
          console.error('Error deleting task:', error)
        })
    }
  }

  return (
    <Container>
      <Box>
        <PageTitle>Tasks</PageTitle>
      </Box>
      <TableContainer component={Paper} sx={{ marginBottom: '30px' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: purple[800] }}>
              <TableCell
                sx={{ width: '23%', textAlign: 'center', color: 'white' }}
              >
                Title
              </TableCell>
              <TableCell
                sx={{ width: '23%', textAlign: 'center', color: 'white' }}
              >
                Detail
              </TableCell>
              <TableCell
                sx={{ width: '23%', textAlign: 'center', color: 'white' }}
              >
                URL
              </TableCell>
              <TableCell sx={{ textAlign: 'center', color: 'white' }}>
                Deadline
              </TableCell>
              <TableCell
                sx={{ width: '23%', textAlign: 'center', color: 'white' }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: index % 2 === 0 ? purple[50] : purple[100],
                }}
              >
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.detail}</TableCell>
                <TableCell>
                  <a href={task.url} target="_blank" rel="noopener noreferrer">
                    {task.url}
                  </a>
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  {new Date(task.deadline).toLocaleDateString()}
                </TableCell>
                <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                  <IconButton
                    component={RouterLink}
                    to={`/tasks/${task.id}/edit`}
                    sx={{
                      color: purple[500],
                      margin: '0 5px',
                      ':hover': {
                        color: purple[600],
                      },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(task.id)}
                    sx={{
                      color: purple[700],
                      margin: '0 5px',
                      ':hover': {
                        color: purple[800],
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
