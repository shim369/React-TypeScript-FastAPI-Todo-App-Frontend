import { ReactNode } from 'react'
import { Typography } from '@mui/material'
import { purple } from '@mui/material/colors'

interface PageTitleProps {
  children: ReactNode
}

const PageTitle = ({ children }: PageTitleProps) => {
  return (
    <Typography
      variant="h4"
      sx={{
        color: purple[800],
        textAlign: 'center',
        margin: '30px 0',
      }}
    >
      {children}
    </Typography>
  )
}

export default PageTitle
