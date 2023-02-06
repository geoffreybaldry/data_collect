const { Sequelize } = require('sequelize')

const AURORA_DB_ENDPOINT = process.env.AURORA_DB_ENDPOINT
const AURORA_DB_PORT = process.env.AURORA_DB_PORT
const AURORA_DB_DATABASE = process.env.AURORA_DB_DATABASE
const AURORA_USERNAME = process.env.AURORA_USERNAME
const AURORA_PASSWORD = process.env.AURORA_PASSWORD
const AURORA_DIALECT = process.env.AURORA_DIALECT

const LAMBDA_FUNCTION_TIMEOUT = process.env.LAMBDA_FUNCTION_TIMEOUT

const pool = {
  max: 2, // Model.findAndCountAll issues 2 requests
  min: 0, // Cause connection pool eviction to eventually clean all connections
  idle: 0, // Make connections immediately available for cleanup after returning to pool
  acquire: 3000, // Fail fast if a connection takes too long to be established
  evict: LAMBDA_FUNCTION_TIMEOUT,
}

// A Singleton service class to contain calls to the Sequelize service
class DB {
  constructor() {
    this.sequelize = new Sequelize(
      AURORA_DB_DATABASE,
      AURORA_USERNAME,
      AURORA_PASSWORD,
      {
        host: AURORA_DB_ENDPOINT,
        port: AURORA_DB_PORT,
        dialect: AURORA_DIALECT,
        pool: pool,
      }
    )
  }

  // Lazy initialization of the instance
  static getInstance() {
    if (!this.instance) {
      console.log('Creating new sequelize instance.')
      this.instance = new DB()
    }
    console.log('Using existing sequelize instance.')
    // Some additional work here to make Sequelize work nicely with AWS Lambda - maybe not needed?
    // restart connection pool to ensure connections are not re-used across invocations
    // this.instance.sequelize.connectionManager.initPools()
    // restore `getConnection()` if it has been overwritten by `close()`
    // if (
    //   this.instance.sequelize.connectionManager.hasOwnProperty('getConnection')
    // ) {
    //   delete this.instance.sequelize.connectionManager.getConnection
    // }

    return this.instance
  }

  async getModels() {
    return this.sequelize.models
  }
}

module.exports = DB
