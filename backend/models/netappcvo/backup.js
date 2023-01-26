const { DataTypes } = require('sequelize')
const DB = require('../../services/db')

const instance = DB.getInstance()

const backup = instance.sequelize.define(
  'Backup',
  {
    fileSystemId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    style: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    protocol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    svm: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    backupStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastBackupCreationTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    snapshotCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    objectLock: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    backupPolicyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    backupPolicyRuleLabel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    backupPolicyRuleRetention: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacityAllocated: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    capacityUsed: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    capacityCharging: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    capacityLogicalUsedSize: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    // Foreign Key(s)
    // volumeUUID: {
    //   type: DataTypes.STRING,
    //   references: {
    //     model: 'Volumes',
    //     key: 'uuid',
    //   },
    // },
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
  backup,
}
