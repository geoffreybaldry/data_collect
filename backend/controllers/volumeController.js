const asyncHandler = require('express-async-handler')
const { toBytes } = require('../utils/utils')
const { Op } = require('sequelize')

const Volume = require('../models/netappcvo/volume').volume
const WorkingEnvironment =
  require('../models/netappcvo/workingEnvironment').workingEnvironment

const getVolumes = asyncHandler(async (req, res) => {
  try {
    // Get pagination options from query params
    const {
      page = 1,
      pageSize = 20,
      sort = null,
      search = '',
      filter = null,
    } = req.query

    const generateSort = (sortList) => {
      const sortFormatted = []
      for (const sort of sortList) {
        sortFormatted.push([sort.field, sort.sort.toUpperCase()])
      }
      return sortFormatted
    }

    const sortList = JSON.parse(sort)
    const sortFormatted = sortList.length == 0 ? [] : generateSort(sortList)

    const generateFilter = (filterList) => {
      const filterObj = {}
      for (const filter of filterList) {
        // if (!filter.value) continue

        switch (filter.operatorValue) {
          case 'equals':
            'value' in filter &&
              filter.value &&
              (filterObj[filter.columnField] = filter.value)
            break

          case 'contains':
            'value' in filter &&
              filter.value &&
              (filterObj[filter.columnField] = {
                [Op.like]: '%' + filter.value + '%',
              })
            break
          case 'startsWith':
            'value' in filter &&
              filter.value &&
              (filterObj[filter.columnField] = {
                [Op.startsWith]: filter.value,
              })
            break
          case 'endsWith':
            'value' in filter &&
              filter.value &&
              (filterObj[filter.columnField] = {
                [Op.endsWith]: filter.value,
              })
            break
          case 'isEmpty':
            filterObj[filter.columnField] = {
              [Op.is]: null,
            }
            break
          case 'isNotEmpty':
            filterObj[filter.columnField] = {
              [Op.not]: null,
            }

          // case 'isAnyOf':
        }
      }
      return filterObj
    }

    const filterObj = JSON.parse(filter)
    const filterFormatted =
      filterObj && filterObj.items && filterObj.items.length !== 0
        ? generateFilter(filterObj.items)
        : {}

    const result = await Volume.findAndCountAll({
      order: sortFormatted,
      limit: Number(pageSize),
      offset: page * pageSize,
      where: filterFormatted,
      include: WorkingEnvironment,
    })

    res.status(200).json(result)
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
})

const upsertVolume = asyncHandler(async (req, res) => {
  try {
    const volume = await Volume.upsert({
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

      // Foreign Key(s)
      workingEnvironmentPublicId: req.body.workingEnvironmentPublicId,
    })

    res.status(201).json(volume)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

module.exports = {
  upsertVolume,
  getVolumes,
}
