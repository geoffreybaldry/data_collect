module.exports = (models) => {
  models.WorkingEnvironment.hasMany(models.Aggregate, {
    foreignKey: 'workingEnvironmentPublicId',
  })
  models.Aggregate.belongsTo(models.WorkingEnvironment, {
    foreignKey: 'workingEnvironmentPublicId',
  })

  models.WorkingEnvironment.hasMany(models.Volume, {
    foreignKey: 'workingEnvironmentPublicId',
  })
  models.Volume.belongsTo(models.WorkingEnvironment, {
    foreignKey: 'workingEnvironmentPublicId',
  })

  models.WorkingEnvironment.hasMany(models.Node, {
    foreignKey: 'workingEnvironmentPublicId',
  })
  models.Node.belongsTo(models.WorkingEnvironment, {
    foreignKey: 'workingEnvironmentPublicId',
  })

  models.WorkingEnvironment.hasMany(models.Instance, {
    foreignKey: 'workingEnvironmentPublicId',
  })
  models.Instance.belongsTo(models.WorkingEnvironment, {
    foreignKey: 'workingEnvironmentPublicId',
  })

  models.WorkingEnvironment.hasOne(models.WorkingEnvironmentBackup, {
    foreignKey: 'workingEnvironmentPublicId',
  })
  models.WorkingEnvironmentBackup.belongsTo(models.WorkingEnvironment, {
    foreignKey: 'workingEnvironmentPublicId',
  })

  models.Aggregate.hasMany(models.ProviderVolume, {
    foreignKey: 'aggregateId',
  })
  models.ProviderVolume.belongsTo(models.Aggregate, {
    foreignKey: 'aggregateId',
  })
}
