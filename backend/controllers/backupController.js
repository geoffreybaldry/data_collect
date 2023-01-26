const asyncHandler = require('express-async-handler')
const { toBytes } = require('../utils/utils')

const Backup = require('../models/netappcvo/backup').backup

const upsertBackup = asyncHandler(async (req, res) => {
  try {
    const backup = await Backup.upsert({
      fileSystemId: req.body.fileSystemId,
      name: req.body.name,
      type: req.body.type,
      style: req.body.style,
      protocol: req.body.protocol,
      svm: req.body.svm,
      status: req.body.status,
      backupStatus: req.body.backupStatus,
      lastBackupCreationTime: req.body.lastBackupCreationTime,
      snapshotCount: req.body.snapshotCount,
      lag: req.body.lag,
      objectLock: req.body.objectLock,
      backupPolicyName: req.body.backupPolicyName,
      backupPolicyRuleLabel: req.body.backupPolicyRuleLabel,
      backupPolicyRuleRetention: req.body.backupPolicyRuleRetention,
      capacityAllocated: req.body.capacityAllocated,
      capacityUsed: req.body.capacityUsed,
      capacityCharging: req.body.capacityCharging,
      capacityLogicalUsedSize: req.body.capacityLogicalUsedSize,

      // Foreign key(s)
      // volumeUUID: req.body.volumeUUID,
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
