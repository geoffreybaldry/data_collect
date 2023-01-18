const { Sequelize } = require('sequelize')

// A Singleton service class to contain calls to the Sequelize service
class DB {
  constructor(dialect, storage) {
    this.sequelize = new Sequelize({
      dialect: dialect,
      storage: storage,
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
