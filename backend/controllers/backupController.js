const asyncHandler = require('express-async-handler')
const { toBytes } = require('../utils/utils')
const { Op } = require('sequelize')

const Backup = require('../models/netappcvo/backup').backup

const upsertBackup = asyncHandler(async (req, res) => {
  const obj = {
    fileSystemId: req.body['file-system-id'],
    name: req.body.name,
    type: req.body.type,
    style: req.body.style,
    protocol: req.body.protocol,
    svm: req.body.svm,
    status: req.body.status,
    backupStatus: req.body['backup-status'],
    lastBackupCreationTime: req.body['last-backup-creation-time'],
    snapshotCount: req.body['snapshot-count'],
    lag: req.body.lag,
    objectLock: req.body['object-lock'] ? req.body['object-lock'] : null,
    backupPolicyName: req.body['backup-policy'].name,
    backupPolicyRuleLabel: req.body['backup-policy']['rule'][0].label,
    backupPolicyRuleRetention: req.body['backup-policy']['rule'][0].retention,
    capacityAllocated: req.body.capacity.allocated,
    capacityUsed: req.body.capacity.used,
    capacityCharging: req.body.capacity.charging,
    capacityLogicalUsedSize: req.body.capacity.logicalUsedSize,

    // Foreign Key(s)
    volumeUUID: req.body.volumeUUID,
  }

  try {
    const backup = await Backup.upsert(obj)

    res.status(201).json(backup)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

module.exports = {
  upsertBackup,
}
