import { BrowserRouter } from 'react-router-dom'
import MyRouter from './router/index'
import Header from './components/Header'
import { grey } from '@mui/material/colors'
import { Box } from '@mui/material'

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ backgroundColor: grey[100], minHeight: '100vh' }}>
        <Header />
        <MyRouter />
      </Box>
    </BrowserRouter>
  )
}

export default App
