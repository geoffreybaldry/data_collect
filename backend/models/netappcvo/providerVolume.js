const { DataTypes } = require('sequelize')
const DB = require('../../services/db')

const instance = DB.getInstance()

const providerVolume = instance.sequelize.define(
  'ProviderVolume',
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    sizeBytes: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    device: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instanceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    diskType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    encrypted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    iops: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    throughput: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    instance2Id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    aggregateId: {
      type: DataTypes.STRING,
      references: {
        model: 'Aggregates',
        key: 'aggregateId', // Surrogate Key because API does not provide an aggregateId
      },
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
  providerVolume,
}
