const asyncHandler = require('express-async-handler')
const Node = require('../models/netappcvo/node').node

const upsertNode = asyncHandler(async (req, res) => {
  // console.log('node info : ' + JSON.stringify(req.body))

  try {
    const node = await Node.upsert({
      name: req.body.name,
      serialNumber: req.body.serialNumber,
      systemId: req.body.systemId,
      platformLicense: req.body.platformLicense,
      platformSerialNumber: req.body.platformSerialNumber,
      cloudProviderId: req.body.cloudProviderId,
      healthy: req.body.healthy,
      inTakeover: req.body.inTakeover,

      // Foreign key(s)
      workingEnvironmentPublicId: req.body.workingEnvironmentPublicId,
    })

    res.status(201).json(node)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

module.exports = {
  upsertNode,
}
