const asyncHandler = require('express-async-handler')

const CloudManagerConnector =
  require('../models/netappcvo/cloudManagerConnector').cloudManagerConnector

const getCloudManagerConnectors = asyncHandler(async (req, res) => {
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

    const result = await CloudManagerConnector.findAndCountAll({
      order: sortFormatted,
      limit: Number(pageSize),
      offset: page * pageSize,
      where: filterFormatted,
      // include: WorkingEnvironment,
    })

    res.status(200).json(result)
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
})

const upsertCloudManagerConnector = asyncHandler(async (req, res) => {
  // await CloudManagerConnector.sync()
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
  getCloudManagerConnectors,
}
