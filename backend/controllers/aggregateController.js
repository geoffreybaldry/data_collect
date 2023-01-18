const asyncHandler = require('express-async-handler')

const Aggregate = require('../models/aggregate').aggregate

const upsertAggregate = asyncHandler(async (req, res) => {
  const aggregate = await Aggregate.create({
    name: req.body.name,
    workingEnvironmentId: req.body.workingEnvironmentId,
    workingEnvironmentName: req.body.workingEnvironmentName,
    totalCapacityGB: req.body.totalCapacityGB,
    usedCapacityGB: req.body.usedCapacityGB,
    // providerVolumeId: req.body.providerVolumeId,
    providerVolumeSizeGB: req.body.providerVolumeSizeGB,
    providerVolumeDiskType: req.body.providerVolumeDiskType,
  })

  res.status(201).json(aggregate)
})

module.exports = {
  upsertAggregate,
}
