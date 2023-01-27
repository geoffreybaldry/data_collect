const { DataTypes } = require('sequelize')
const DB = require('../../services/db')

const instance = DB.getInstance()

const node = instance.sequelize.define(
  'Node',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    systemId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    platformLicense: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    platformSerialNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cloudProviderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    healthy: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    inTakeover: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    // Foreign Key(s)
    workingEnvironmentPublicId: {
      type: DataTypes.STRING,
      references: {
        model: 'WorkingEnvironments',
        key: 'publicId',
      },
    },
  },
  {
    timestamps: true,
  }
)

// const sync = async () => {
//   await aggregate.sync()
// }

// sync()

module.exports = {
  node,
}
