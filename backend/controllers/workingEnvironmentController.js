const asyncHandler = require('express-async-handler')
const { Op } = require('sequelize')

const WorkingEnvironment =
  require('../models/netappcvo/workingEnvironment').workingEnvironment

const getWorkingEnvironments = asyncHandler(async (req, res) => {
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

    const result = await WorkingEnvironment.findAndCountAll({
      order: sortFormatted,
      limit: Number(pageSize),
      offset: page * pageSize,
      where: filterFormatted,
    })

    res.status(200).json(result)
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
})

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
  getWorkingEnvironments,
}
