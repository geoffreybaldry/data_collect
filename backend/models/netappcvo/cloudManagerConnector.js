const { DataTypes } = require('sequelize')
const DB = require('../../services/db')

const instance = DB.getInstance()

const cloudManagerConnector = instance.sequelize.define(
  'CloudManagerConnector',
  {
    // account: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    accountName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    occm: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    agentId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    occmName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    primaryCallbackUri: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Foreign Key(s)
    account: {
      type: DataTypes.STRING,
      references: {
        model: 'Accounts',
        key: 'accountPublicId',
      },
    },
  },
  {
    timestamps: true,
  }
)

// const sync = async () => {
//   await cloudManagerConnector.sync()
// }

// sync()

module.exports = {
  cloudManagerConnector,
}
