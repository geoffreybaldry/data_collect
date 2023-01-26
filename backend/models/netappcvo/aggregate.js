const { DataTypes } = require('sequelize')
const DB = require('../../services/db')

const instance = DB.getInstance()

const aggregate = instance.sequelize.define(
  'Aggregate',
  {
    aggregateId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    availableCapacityBytes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalCapacityBytes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usedCapacityBytes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    encryptionType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    encryptionKeyId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isRoot: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    homeNode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerNode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacityTier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacityTierUsedBytes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sidlEnabled: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    snaplockType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    evCompatibilityType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    iops: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
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
  aggregate,
}
