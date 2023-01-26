import Header from 'components/Header'
import StatBox from 'components/StatBox'
import { Box, useTheme, useMediaQuery, Skeleton } from '@mui/material'
import GavelIcon from '@mui/icons-material/Gavel'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { getIpos, reset, resetStatus } from 'features/ipo/ipoSlice'
import { toast } from 'react-toastify'

function Dashboard() {
  const theme = useTheme()
  const isNonMediumScreens = useMediaQuery('(min-width: 1200px)')

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Dashboard Page" subtitle="This is the Dashboard Page" />
    </Box>
  )
}

export default Dashboard
