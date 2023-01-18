import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { reset } from 'features/auth/authSlice'
import Form from './Form'

const LoginPage = () => {
  const theme = useTheme()
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)')
  const { user, status, message } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (status === 'register_success') {
      toast.success(message)
      dispatch(reset())
    }
    if (status === 'success') dispatch(reset())

    if (user) navigate('/dashboard')

    if (status === 'error') {
      toast.error(message)
      dispatch(reset())
    }
  }, [user, status, message, navigate, dispatch])

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Login/Register
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? '50%' : '93%'}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.default}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: '1.5rem' }}>
          Register your account here.
        </Typography>
        <Form />
      </Box>
    </Box>
  )
}

export default LoginPage
