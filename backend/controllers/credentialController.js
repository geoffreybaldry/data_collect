const asyncHandler = require('express-async-handler')
// const bcrypt = require('bcryptjs')

const Credential = require('../models/netappcvo/credential').netappCVOCredential

const addCredential = asyncHandler(async (req, res) => {
  const { accountName, accountId, clientId, clientSecret, comment } = req.body

  if (!accountName || !accountId || !clientId || !clientSecret || !comment) {
    res.status(400)
    throw new Error('Please add all fields.')
  }

  const credentialExists = await Credential.findOne({
    where: { accountId: accountId },
  })
  if (credentialExists) {
    res.status(400)
    throw new Error(
      'Credential with accountId name ' + accountId + ' already exists'
    )
  }

  // Hash the clientId and clientSecret
  // const salt = await bcrypt.genSalt(10)
  // const hashedClientId = await bcrypt.hash(clientId, salt)
  // const hashedClientSecret = await bcrypt.hash(clientSecret, salt)

  try {
    const credential = await Credential.create({
      accountName,
      accountId,
      // clientId: hashedClientId,
      // clientSecret: hashedClientSecret,
      clientId,
      clientSecret,
      comment,
    })

    res.status(201).json({
      id: credential.id,
      accountName: credential.accountName,
      accountId: credential.accountId,
      environment: credential.environment,
    })
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
})

const getCredentials = asyncHandler(async (req, res) => {
  const credentials = await Credential.findAll()
  res.status(200).json(credentials)
})

module.exports = {
  addCredential,
  getCredentials,
}
