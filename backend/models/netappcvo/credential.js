const { DataTypes } = require('sequelize')
const DB = require('../../services/db')

const instance = DB.getInstance()

const netappCVOCredential = instance.sequelize.define(
  'NetappCVOCredential',
  {
    accountName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    accountId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    clientId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clientSecret: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
)

// const sync = async () => {
//   await netappCVOCredential.sync()
// }

// sync()

module.exports = {
  netappCVOCredential,
}
