import { Box, useMediaQuery, useTheme } from '@mui/material'
import Header from 'components/Header'
import { React } from 'react'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

function Landing() {
  const theme = useTheme()
  const isNonMediumScreens = useMediaQuery('(min-width: 1200px)')

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Landing Page" subtitle="This is the Landing Page" />
    </Box>
  )
}

export default Landing
