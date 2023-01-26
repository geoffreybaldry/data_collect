const asyncHandler = require('express-async-handler')
const { toBytes } = require('../utils/utils')

const ProviderVolume =
  require('../models/netappcvo/providerVolume').providerVolume

const upsertProviderVolume = asyncHandler(async (req, res) => {
  try {
    const providerVolume = await ProviderVolume.upsert({
      id: req.body.id,
      name: req.body.name,
      sizeBytes: toBytes(req.body.size),
      state: req.body.state,
      device: req.body.device,
      instanceId: req.body.instanceId,
      diskType: req.body.diskType,
      encrypted: req.body.encrypted,
      iops: req.body.iops,
      throughput: req.body.throughput,
      instance2Id: req.body.instance2Id,

      // Foreign key(s)
      aggregateId: req.body.aggregateId,
    })

    res.status(201).json(providerVolume)
  } catch (error) {
    res.status(400)
    // console.log('Error with volume : ' + JSON.stringify(req.body))
    throw new Error(error)
  }
})

module.exports = {
  upsertProviderVolume,
}
