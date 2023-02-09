const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware')
const accountRoutes = require('./routes/accountRoutes')
const cloudManagerConnectorRoutes = require('./routes/cloudManagerConnectorRoutes')
const aggregateRoutes = require('./routes/aggregateRoutes')
const workingEnvironmentRoutes = require('./routes/workingEnvironmentRoutes')
const volumeRoutes = require('./routes/volumeRoutes')
const nodeRoutes = require('./routes/nodeRoutes')
const instanceRoutes = require('./routes/instanceRoutes')
const volumeBackupRoutes = require('./routes/volumeBackupRoutes')
const providerVolumeRoutes = require('./routes/providerVolumeRoutes')
const workingEnvironmentBackupRoutes = require('./routes/workingEnvironmentBackupRoutes')
const authRoutes = require('./routes/authRoutes')
const credentialRoutes = require('./routes/credentialRoutes')
const DB = require('./services/db')

const instance = DB.getInstance()

// The above route 'requires' will cause the DB models to be created downstream,
// and populate the sequelize.models variable. Use it to create the associations
require('./models/netappcvo/associations')(instance.sequelize.models)

// Now that the models and associations are created, call sync to push to the DB
instance.sequelize.sync()

const PORT = process.env.PORT

// Create express app
const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({ origin: true, credentials: true }))

// Routes must come after the other middlewares!
app.use('/api/account', accountRoutes)
app.use('/api/cloudManagerConnector', cloudManagerConnectorRoutes)
app.use('/api/aggregate', aggregateRoutes)
app.use('/api/workingEnvironment', workingEnvironmentRoutes)
app.use('/api/volume', volumeRoutes)
app.use('/api/providerVolume', providerVolumeRoutes)
app.use('/api/node', nodeRoutes)
app.use('/api/instance', instanceRoutes)
app.use('/api/volumebackup', volumeBackupRoutes)
app.use('/api/workingEnvironmentBackup', workingEnvironmentBackupRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/credential', credentialRoutes)

// ErrorHandler after routes
app.use(errorHandler)

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT)
})
