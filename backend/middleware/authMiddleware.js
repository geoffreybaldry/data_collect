const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/user').user

const protect = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token, but don't retreive the password
      // This populates req.user with all the user data, and makes it available
      // to later middleware or to the route controller at the end.
      req.user = await User.findByPk(decoded.id, {
        attributes: {
          exclude: ['password'],
        },
      })

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = {
  protect,
}
