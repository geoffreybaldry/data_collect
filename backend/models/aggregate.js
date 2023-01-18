const { DataTypes } = require('sequelize')
const DB = require('../services/db')

const instance = DB.getInstance()

const aggregate = instance.sequelize.define(
  'Aggregate',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    workingEnvironmentId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    workingEnvironmentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalCapacityGB: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    usedCapacityGB: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    // providerVolumeId: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    providerVolumeSizeGB: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    providerVolumeDiskType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
)

const sync = async () => {
  await aggregate.sync()
}

sync()

module.exports = {
  aggregate,
}
