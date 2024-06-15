import { useState } from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField'
import { Box, Button, Paper } from '@mui/material'
import { purple } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'

export default function TaskCreate() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('')
  const [detail, setDetail] = useState('')
  const [url, setUrl] = useState('')
  const [deadline, setDeadline] = useState('')
  const paperStyle = {
    padding: '30px 20px',
    maxWidth: 600,
    margin: '50px auto',
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const task = { title, detail, url, deadline }
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/todo`, task, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(() => {
        navigate("/");
      })
      setTitle('')
      setDetail('')
      setUrl('')
      setDeadline('')
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }
  return (
    <Paper elevation={3} style={paperStyle}>
      <h2
        style={{
          color: purple[800],
          textAlign: 'center',
          marginBottom: '30px',
        }}
      >
        Add Task
      </h2>
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
  )
}
