import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Container, Paper, Button } from '@mui/material'
import { red } from '@mui/material/colors'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { Task } from '../types/types'

export default function TaskEdit() {
  const paperStyle = {
    padding: '30px 20px',
    maxWidth: 600,
    margin: '50px auto',
  }
  const buttonColor = red[600]
  const { id } = useParams()
  const [errors, setErrors] = useState<string[]>([])
  const [task, setTask] = useState<Task>({
    id: '',
    title: '',
    detail: '',
    url: '',
    deadline: new Date(),
  })

  useEffect(() => {
    const getTaskById = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/todo/${id}`
        )
        setTask({
          ...res.data,
          deadline: res.data.deadline ? new Date(res.data.deadline) : null,
        })
      } catch (error) {
        console.error('Error fetching task:', error)
      }
    }

    getTaskById()
  }, [id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTask((prevState) => ({
      ...prevState,
      [name]: name === 'deadline' ? (value ? new Date(value) : null) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = {
      id: task.id,
      title: task.title,
      detail: task.detail,
      url: task.url,
      deadline:
        task.deadline instanceof Date ? task.deadline.toISOString() : null,
    }

    let errors: string[] = []

    if (!data.title) {
      errors.push('Task title is required!')
    }

    if (!data.url) {
      errors.push('Task URL is required!')
    }

    setErrors(errors)

    if (errors.length === 0) {
      try {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/todo/${id}`,
          data
        )
      } catch (error) {
        console.error('Error updating task:', error)
      }
    }
  }

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h2 style={{ color: '#1976d2' }}>Edit Task</h2>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            '& > :not(style)': { m: 2, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="taskTitle"
            label="Task Title"
            variant="outlined"
            value={task.title}
            name="title"
            onChange={handleInputChange}
          />
          <TextField
            id="taskDetail"
            label="Task Detail"
            variant="outlined"
            value={task.detail}
            name="detail"
            onChange={handleInputChange}
          />
          <TextField
            id="taskURL"
            label="Task URL"
            variant="outlined"
            value={task.url}
            name="url"
            onChange={handleInputChange}
          />
          <TextField
            id="taskDeadline"
            label="Task Deadline"
            variant="outlined"
            value={
              task.deadline instanceof Date
                ? task.deadline.toISOString().slice(0, 10)
                : ''
            }
            type="date"
            name="deadline"
            onChange={handleInputChange}
          />

          <div>
            <ul className="text-danger">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
          <Button
            variant="contained"
            type="submit"
            style={{ backgroundColor: buttonColor }}
          >
            Update Task
          </Button>
        </Box>
      </Paper>
      <Link to="/">Back to Top</Link>
    </Container>
  )
}
