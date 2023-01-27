const asyncHandler = require('express-async-handler')
const { Op } = require('sequelize')
const Instance = require('../models/netappcvo/instance').instance
const WorkingEnvironment =
  require('../models/netappcvo/workingEnvironment').workingEnvironment

const getInstances = asyncHandler(async (req, res) => {
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
    console.log('Sort Formatted : ' + JSON.stringify(sortFormatted))

    const generateFilter = (filterList) => {
      console.log('Received filterList : ' + JSON.stringify(filterList))
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
    console.log('FilterObj : ' + JSON.stringify(filterObj))
    const filterFormatted =
      filterObj && filterObj.items && filterObj.items.length !== 0
        ? generateFilter(filterObj.items)
        : {}
    console.log('Filter Formatted : ' + JSON.stringify(filterFormatted))

    const result = await Instance.findAndCountAll({
      order: sortFormatted,
      limit: pageSize,
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
  getInstances,
}
