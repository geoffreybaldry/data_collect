const { Sequelize } = require('sequelize')

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
  constructor(dialect, storage) {
    this.sequelize = new Sequelize({
      dialect: dialect,
      storage: storage,
      pool: pool,
    })
  }

  // Lazy initialization of the instance
  static getInstance() {
    if (!this.instance) {
      console.log('Creating new sequelize instance.')
      this.instance = new DB('sqlite', 'netapp_data.sqlite3')
    }
    console.log('Using existing sequelize instance.')
    return this.instance
  }

  async getModels() {
    return this.sequelize.models
  }
}

module.exports = DB
