import { BrowserRouter } from 'react-router-dom'
import MyRouter from './router/index'
import Header from './components/Header'
import { Box } from '@mui/material'

function App() {
  return (
    <BrowserRouter>
      <Box>
        <Header />
        <MyRouter />
      </Box>
    </BrowserRouter>
  )
}

export default App
