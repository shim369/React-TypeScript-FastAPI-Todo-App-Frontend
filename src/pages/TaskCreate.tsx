import { useState } from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField'
import { Box, Button, Paper, Typography } from '@mui/material'
import { purple } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../components/PageTitle'

export default function TaskCreate() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [detail, setDetail] = useState('')
  const [url, setUrl] = useState('')
  const [deadline, setDeadline] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const task = { title, detail, url, deadline }
    let formErrors: string[] = []

    if (!title) {
      formErrors.push('Task Title is required')
    }
    if (!detail) {
      formErrors.push('Task Detail is required')
    }
    if (!url) {
      formErrors.push('Task URL is required')
    }
    if (!deadline) {
      formErrors.push('Task Deadline is required')
    }

    setErrors(formErrors)

    if (formErrors.length === 0) {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/todo`, task)
        navigate('/')
        setTitle('')
        setDetail('')
        setUrl('')
        setDeadline('')
      } catch (error) {
        console.error('Error adding task:', error)
      }
    }
  }

  return (
    <>
      <PageTitle>Create Task</PageTitle>
      <Paper elevation={3} className='paperStyle'>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '& > :not(style)': { mb: 4, width: '100%' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="taskTitle"
            label="Task Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="taskDetail"
            label="Task Detail"
            variant="outlined"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="taskUrl"
            label="Task URL"
            variant="outlined"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="taskDeadline"
            label="Task Deadline"
            variant="outlined"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />

          {errors.length > 0 && (
            <Box
              sx={{
                mt: 2,
                border: '1px solid red',
                borderRadius: '4px',
                p: 2,
                bgcolor: 'rgba(255, 0, 0, 0.1)',
              }}
            >
              <Typography variant="subtitle1" color="error">
                Errors:
              </Typography>
              <ul>
                {errors.map((error, index) => (
                  <Typography key={index} variant="body2" color="error">
                    {error}
                  </Typography>
                ))}
              </ul>
            </Box>
          )}

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100% !important',
            }}
          >
            <Button
              variant="contained"
              type="submit"
              sx={{
                margin: '0 5px',
                backgroundColor: purple[700],
                ':hover': {
                  backgroundColor: purple[800],
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  )
}
