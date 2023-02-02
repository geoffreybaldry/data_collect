const asyncHandler = require('express-async-handler')
const { workingEnvironment } = require('../models/netappcvo/workingEnvironment')
const { toBytes } = require('../utils/utils')
const { Op } = require('sequelize')

const Aggregate = require('../models/netappcvo/aggregate').aggregate
const WorkingEnvironment =
  require('../models/netappcvo/workingEnvironment').workingEnvironment

const ProviderVolume =
  require('../models/netappcvo/providerVolume').providerVolume

const getProviderVolumes = asyncHandler(async (req, res) => {
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

    const result = await ProviderVolume.findAndCountAll({
      order: sortFormatted,
      limit: Number(pageSize),
      offset: page * pageSize,
      where: filterFormatted,
      include: [
        {
          model: Aggregate,
          include: [WorkingEnvironment],
        },
      ],
    })

    res.status(200).json(result)
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
})

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
    throw new Error(error)
  }
})

module.exports = {
  upsertProviderVolume,
  getProviderVolumes,
}
