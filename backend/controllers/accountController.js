const asyncHandler = require('express-async-handler')
const { Op } = require('sequelize')
const Account = require('../models/netappcvo/account').account

const getAccounts = asyncHandler(async (req, res) => {
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
        const sortFields = sort.field.replace(/\$/g, '')
        const sortfieldsList = sortFields.split('.')
        switch (sortFields.length) {
          case 1:
            sortFormatted.push([sortFields[0], sort.sort.toUpperCase()])
          case 2:
            sortFormatted.push([
              sortFields[0],
              sortFields[1],
              sort.sort.toUpperCase(),
            ])
          case 3:
            sortFormatted.push([
              sortFields[0],
              sortFields[1],
              sortFields[2],
              sort.sort.toUpperCase(),
            ])
        }

        // sortFormatted.push([sort.field, sort.sort.toUpperCase()])
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

    const result = await Account.findAndCountAll({
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

const upsertAccount = asyncHandler(async (req, res) => {
  try {
    const account = await Account.upsert({
      accountPublicId: req.body.accountPublicId,
      accountName: req.body.accountName,
      isSaas: req.body.isSaas,
      isGov: req.body.isGov,
      isPrivatePreviewEnabled: req.body.isPrivatePreviewEnabled,
      is3rdPartyServicesEnabled: req.body.is3rdPartyServicesEnabled,
      accountSerial: req.body.accountSerial,
    })

    res.status(201).json(account)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

module.exports = {
  upsertAccount,
  getAccounts,
}
