const { DataTypes } = require('sequelize')
const DB = require('../../services/db')

const instance = DB.getInstance()

const workingEnvironment = instance.sequelize.define(
  'WorkingEnvironment',
  {
    publicId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      // unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tenantId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    svmName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isHA: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    workingEnvironmentType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
)

// const sync = async () => {
//   await workingEnvironment.sync()
// }

// sync()

module.exports = {
  workingEnvironment,
}
