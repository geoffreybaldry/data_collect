const { DataTypes } = require('sequelize')
const DB = require('../../services/db')

const instance = DB.getInstance()

const volume = instance.sequelize.define(
  'Volume',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    svmName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sizeBytes: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    usedSizeBytes: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    junctionPath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    volumeTotalInodes: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    volumeUsedInodes: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    mountPoint: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    compressionSpaceSavedBytes: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    deduplicationSpaceSavedBytes: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    thinProvisioning: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    compression: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    deduplication: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    snapshotPolicy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    securityStyle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rootVolume: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    volumeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aggregateName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentSnapshot: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    autoSizeMode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxGrowSizeBytes: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    providerVolumeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacityTier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacityTierUsedSizeBytes: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    tieringPolicy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    snapshotsUsedSizeBytes: {
      type: DataTypes.BIGINT,
      allowNull: true,
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
//   await volume.sync()
// }

// sync()

module.exports = {
  volume,
}
