const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/user').user

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body

  if (!firstName || !lastName || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields.')
  }

  const userExists = await User.findOne({ where: { email: email } })
  if (userExists) {
    res.status(400)
    throw new Error('User ' + email + ' already exists')
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: 'user', // Default role given to all new users
    })

    res.status(201).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    })
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
})

const loginUser = asyncHandler(async (req, res) => {
  console.log('REQ headers: ' + JSON.stringify(req.headers))
  console.log('Login attempt from ' + JSON.stringify(req.body))
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('email and password are required fields.')
  }

  // Check for user email
  const user = await User.findOne({ where: { email: email } })
  if (!user) {
    res.status(400)
    throw new Error('User ' + email + ' does not exist')
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    console.log('Successful login for user: ' + user.email)
    res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
}
