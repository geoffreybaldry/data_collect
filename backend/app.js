const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const cloudManagerConnectorRoutes = require('./routes/cloudManagerConnectorRoutes')
const aggregateRoutes = require('./routes/aggregateRoutes')
const workingEnvironmentRoutes = require('./routes/workingEnvironmentRoutes')
const volumeRoutes = require('./routes/volumeRoutes')
const authRoutes = require('./routes/authRoutes')
const { errorHandler } = require('./middleware/errorMiddleware')

const PORT = process.env.PORT

// Create express app
const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({ origin: true, credentials: true }))

// Routes must come after the other middlewares!
app.use('/api/cloudManagerConnector', cloudManagerConnectorRoutes)
app.use('/api/aggregate', aggregateRoutes)
app.use('/api/workingEnvironment', workingEnvironmentRoutes)
app.use('/api/volume', volumeRoutes)
app.use('/api/auth', authRoutes)

// ErrorHandler after routes
app.use(errorHandler)

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT)
})
