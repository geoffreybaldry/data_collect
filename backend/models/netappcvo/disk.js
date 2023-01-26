const { DataTypes } = require('sequelize')
const DB = require('../../services/db')

const instance = DB.getInstance()

const disk = instance.sequelize.define(
  'Disk',
  {
    aggregateId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    providerVolumeId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    providerVolumeSizeBytes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    providerVolumeDiskType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
)

// const sync = async () => {
//   await disk.sync()
// }

// sync()

module.exports = {
  disk,
}
