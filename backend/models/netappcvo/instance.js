const { DataTypes } = require('sequelize')
const DB = require('../../services/db')

const dbInstance = DB.getInstance()

const instance = dbInstance.sequelize.define(
  'Instance',
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instanceType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publicIpAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    privateIpAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publicDnsName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    privateDnsName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subnetId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    availabilityZone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVsaInstance: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isOCCMInstance: {
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
  instance,
}
