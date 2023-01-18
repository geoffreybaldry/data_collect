import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
const API_URL = '/api/auth/'

// Register user
const register = async (userData) => {
  try {
    const response = await axios.post(
      API_BASE_URL + API_URL + 'register',
      userData
    )

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
  } catch (error) {
    throw error
  }
}

// Login user
const login = async (userData) => {
  try {
    const response = await axios.post(
      API_BASE_URL + API_URL + 'login',
      userData
    )

    if (response.data) {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data))
      } else {
        throw response.data.errorMessage
      }
    }

    return response.data
  } catch (error) {
    throw error
  }
}

const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  login,
  logout,
}

export default authService
