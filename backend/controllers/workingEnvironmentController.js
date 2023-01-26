const asyncHandler = require('express-async-handler')

const WorkingEnvironment =
  require('../models/netappcvo/workingEnvironment').workingEnvironment

const upsertWorkingEnvironment = asyncHandler(async (req, res) => {
  // await WorkingEnvironment.sync()
  const workingEnvironment = await WorkingEnvironment.upsert({
    publicId: req.body.publicId,
    name: req.body.name,
    tenantId: req.body.tenantId,
    svmName: req.body.svmName,
    isHA: req.body.isHA,
    workingEnvironmentType: req.body.workingEnvironmentType,
  })

  res.status(201).json(workingEnvironment)
})

module.exports = {
  upsertWorkingEnvironment,
}
