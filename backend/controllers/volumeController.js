const asyncHandler = require('express-async-handler')
const { toBytes } = require('../utils/utils')

const Volume = require('../models/volume').volume

const upsertVolume = asyncHandler(async (req, res) => {
  await Volume.sync()
  const volume = await Volume.upsert({
    workingEnvironmentId: req.body.workingEnvironmentId,
    name: req.body.name,
    uuid: req.body.uuid,
    svmName: req.body.svmName,
    sizeBytes: req.body.size ? toBytes(req.body.size) : null,
    usedSizeBytes: req.body.usedSize ? toBytes(req.body.usedSize) : null,
    junctionPath: req.body.junctionPath,
    volumeTotalInodes: req.body.volumeTotalInodes,
    volumeUsedInodes: req.body.volumeUsedInodes,
    mountPoint: req.body.mountPoint,
    compressionSpaceSavedBytes: req.body.compressionSpaceSaved
      ? toBytes(req.body.compressionSpaceSaved)
      : null,
    deduplicationSpaceSavedBytes: req.body.deduplicationSpaceSaved
      ? toBytes(req.body.deduplicationSpaceSaved)
      : null,
    thinProvisioning: req.body.thinProvisioning,
    compression: req.body.compression,
    deduplication: req.body.deduplication,
    snapshotPolicy: req.body.snapshotPolicy,
    securityStyle: req.body.securityStyle,
    rootVolume: req.body.rootVolume,
    state: req.body.state,
    volumeType: req.body.volumeType,
    aggregateName: req.body.aggregateName,
    parentSnapshot: req.body.parentSnapshot,
    autoSizeMode: req.body.autoSizeMode,
    maxGrowSizeBytes: req.body.maxGrowSize
      ? toBytes(req.body.maxGrowSize)
      : null,
    providerVolumeType: req.body.providerVolumeType,
    capacityTier: req.body.capacityTier,
    capacityTierUsedSizeBytes: req.body.capacityTierUsedSize
      ? toBytes(req.body.capacityTierUsedSize)
      : null,
    tieringPolicy: req.body.tieringPolicy,
    comment: req.body.comment,
    snapshotsUsedSizeBytes: req.body.snapshotsUsedSize
      ? toBytes(req.body.snapshotsUsedSize)
      : null,
  })

  res.status(201).json(volume)
})

module.exports = {
  upsertVolume,
}
