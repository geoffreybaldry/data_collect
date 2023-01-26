const asyncHandler = require('express-async-handler')
const { toBytes } = require('../utils/utils')

const Aggregate = require('../models/netappcvo/aggregate').aggregate

const upsertAggregate = asyncHandler(async (req, res) => {
  // console.log('aggr info : ' + JSON.stringify(req.body))

  try {
    const aggregate = await Aggregate.upsert({
      // Surrogate Key because no aggregateId provided by API
      aggregateId: req.body.workingEnvironmentPublicId + ':' + req.body.name,

      name: req.body.name,
      availableCapacityBytes: toBytes(req.body.availableCapacity),
      totalCapacityBytes: toBytes(req.body.totalCapacity),
      usedCapacityBytes: toBytes(req.body.usedCapacity),
      state: req.body.state,
      encryptionType: req.body.encryptionType,
      encryptionKeyId: req.body.encryptionKeyId,
      isRoot: req.body.isRoot,
      homeNode: req.body.homeNode,
      ownerNode: req.body.ownerNode,
      capacityTier: req.body.capacityTier,
      capacityTierUsedBytes: toBytes(req.body.capacityTierUsed),
      sidlEnabled: req.body.sidlEnabled,
      snaplockType: req.body.snaplockType,
      evCompatibilityType: req.body.evCompatibilityType,
      iops: req.body.iops,

      // Foreign key(s)
      workingEnvironmentPublicId: req.body.workingEnvironmentPublicId,
    })

    res.status(201).json(aggregate)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

module.exports = {
  upsertAggregate,
}
