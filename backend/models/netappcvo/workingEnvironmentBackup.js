const { DataTypes } = require('sequelize')
const DB = require('../../services/db')

const instance = DB.getInstance()

const workingEnvironmentBackup = instance.sequelize.define(
  'WorkingEnvironmentBackup',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ontapVersion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    backupEnablementStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    providerAccountId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    providerAccountName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bucket: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usedCapacityGB: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    chargingCapacityBytes: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    logicalUsedSizeBytes: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    backedUpVolumeCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalVolumesCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    failedBackupVolumeCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    autoBackupEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    ipSpace: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    providerAccessKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deleteYearlySnapshots: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    exportExistingSnapshots: {
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
//   await backup.sync()
// }

// sync()

module.exports = {
  workingEnvironmentBackup,
}
