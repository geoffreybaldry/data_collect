module.exports = (models) => {
  // Account has many connectors
  models.Account.hasMany(models.CloudManagerConnector, {
    foreignKey: 'account',
  })
  models.CloudManagerConnector.belongsTo(models.Account, {
    foreignKey: 'account',
  })

  // Working Environment has many Aggregates
  models.WorkingEnvironment.hasMany(models.Aggregate, {
    foreignKey: 'workingEnvironmentPublicId',
  })
  models.Aggregate.belongsTo(models.WorkingEnvironment, {
    foreignKey: 'workingEnvironmentPublicId',
  })

  // Working Environment has many Volumes
  models.WorkingEnvironment.hasMany(models.Volume, {
    foreignKey: 'workingEnvironmentPublicId',
  })
  models.Volume.belongsTo(models.WorkingEnvironment, {
    foreignKey: 'workingEnvironmentPublicId',
  })

  // Working Environment has many Nodes
  models.WorkingEnvironment.hasMany(models.Node, {
    foreignKey: 'workingEnvironmentPublicId',
  })
  models.Node.belongsTo(models.WorkingEnvironment, {
    foreignKey: 'workingEnvironmentPublicId',
  })

  // Working Environment has many Instances
  models.WorkingEnvironment.hasMany(models.Instance, {
    foreignKey: 'workingEnvironmentPublicId',
  })
  models.Instance.belongsTo(models.WorkingEnvironment, {
    foreignKey: 'workingEnvironmentPublicId',
  })

  // Working Environment has one WorkingEnvironmentBackup
  models.WorkingEnvironment.hasOne(models.WorkingEnvironmentBackup, {
    foreignKey: 'workingEnvironmentPublicId',
  })
  models.WorkingEnvironmentBackup.belongsTo(models.WorkingEnvironment, {
    foreignKey: 'workingEnvironmentPublicId',
  })

  // Aggregate has may ProviderVolumes
  models.Aggregate.hasMany(models.ProviderVolume, {
    foreignKey: 'aggregateId',
  })
  models.ProviderVolume.belongsTo(models.Aggregate, {
    foreignKey: 'aggregateId',
  })

  // Aggregate has may Volumes
  models.Aggregate.hasMany(models.Volume, {
    foreignKey: 'aggregateId',
  })
  models.Volume.belongsTo(models.Aggregate, {
    foreignKey: 'aggregateId',
  })

  // Volume has one VolumeBackup
  models.Volume.hasOne(models.VolumeBackup, {
    foreignKey: 'volumeUUID',
  })
  models.VolumeBackup.belongsTo(models.Volume, {
    foreignKey: 'volumeUUID',
  })
}
