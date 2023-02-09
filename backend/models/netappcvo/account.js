const { DataTypes } = require('sequelize')
const DB = require('../../services/db')

const instance = DB.getInstance()

const account = instance.sequelize.define(
  'Account',
  {
    accountPublicId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    accountName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    isSaas: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isGov: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isPrivatePreviewEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    is3rdPartyServicesEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    accountSerial: {
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
  account,
}
