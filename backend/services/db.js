const { Sequelize } = require('sequelize')

const AURORA_DB_ENDPOINT = process.env.AURORA_DB_ENDPOINT
const AURORA_DB_PORT = process.env.AURORA_DB_PORT
const AURORA_DB_DATABASE = process.env.AURORA_DB_DATABASE
const AURORA_USERNAME = process.env.AURORA_USERNAME
const AURORA_PASSWORD = process.env.AURORA_PASSWORD

const DIALECT = 'mysql'

const CURRENT_LAMBDA_FUNCTION_TIMEOUT = 100000 // ms

const pool = {
  max: 2, // Model.findAndCountAll issues 2 requests
  min: 0, // Cause connection pool eviction to eventually clean all connections
  idle: 0, // Make connections immediately available for cleanup after returning to pool
  acquire: 3000, // Fail fast if a connection takes too long to be established
  evict: CURRENT_LAMBDA_FUNCTION_TIMEOUT,
}

// A Singleton service class to contain calls to the Sequelize service
class DB {
  // constructor(dialect, storage) {
  constructor() {
    this.sequelize = new Sequelize(
      AURORA_DB_DATABASE,
      AURORA_USERNAME,
      AURORA_PASSWORD,
      {
        host: AURORA_DB_ENDPOINT,
        port: AURORA_DB_PORT,
        // dialect: dialect,
        // storage: storage,
        dialect: DIALECT,
        pool: pool,
      }
    )
  }

  // Lazy initialization of the instance
  static getInstance() {
    if (!this.instance) {
      console.log('Creating new sequelize instance.')
      // this.instance = new DB('sqlite', 'netapp_data.sqlite3')
      this.instance = new DB()
    }
    console.log('Using existing sequelize instance.')
    return this.instance
  }

  async getModels() {
    return this.sequelize.models
  }
}

module.exports = DB
