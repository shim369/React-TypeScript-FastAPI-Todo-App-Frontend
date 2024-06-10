import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { purple } from '@mui/material/colors'

export default function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: purple[900] }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h6" component="div">
          <h1 style={{ fontSize: '22px' }}>React FastAPI Todo App</h1>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
