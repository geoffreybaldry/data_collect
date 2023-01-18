const asyncHandler = require('express-async-handler')

const CloudManagerConnector =
  require('../models/cloudManagerConnector').cloudManagerConnector

const upsertCloudManagerConnector = asyncHandler(async (req, res) => {
  await CloudManagerConnector.sync()
  const cloudManagerConnector = await CloudManagerConnector.upsert({
    account: req.body.account,
    accountName: req.body.accountName,
    occm: req.body.occm,
    agentId: req.body.agentId,
    status: req.body.status,
    occmName: req.body.occmName,
    primaryCallbackUri: req.body.primaryCallbackUri,
    createDate: req.body.createDate,
  })

  res.status(201).json(cloudManagerConnector)
})

module.exports = {
  upsertCloudManagerConnector,
}
