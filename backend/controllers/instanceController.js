const asyncHandler = require('express-async-handler')
const Instance = require('../models/netappcvo/instance').instance

const upsertInstance = asyncHandler(async (req, res) => {
  // console.log('instance info : ' + JSON.stringify(req.body))

  try {
    const instance = await Instance.upsert({
      id: req.body.id,
      name: req.body.name,
      instanceType: req.body.instanceType,
      state: req.body.state,
      publicIpAddress: req.body.publicIpAddress,
      privateIpAddress: req.body.privateIpAddress,
      publicDnsName: req.body.publicDnsName,
      privateDnsName: req.body.privateDnsName,
      imageId: req.body.imageId,
      subnetId: req.body.subnetId,
      availabilityZone: req.body.availabilityZone,
      isVsaInstance: req.body.isVsaInstance,
      isOCCMInstance: req.body.isOCCMInstance,

      // Foreign key(s)
      workingEnvironmentPublicId: req.body.workingEnvironmentPublicId,
    })

    res.status(201).json(instance)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

module.exports = {
  upsertInstance,
}
