const asyncHandler = require('express-async-handler')

const WorkingEnvironmentBackup =
  require('../models/netappcvo/workingEnvironmentBackup').workingEnvironmentBackup

const WorkingEnvironment =
  require('../models/netappcvo/workingEnvironment').workingEnvironment

const getWorkingEnvironmentsBackup = asyncHandler(async (req, res) => {
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
        console.log('SORT : ' + JSON.stringify(sort))
        const sortFields = sort.field.replace(/\$/g, '')
        const sortfieldsList = sortFields.split('.')
        console.log('SORTLIST : ' + JSON.stringify(sortfieldsList))
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

    const result = await WorkingEnvironmentBackup.findAndCountAll({
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

const upsertWorkingEnvironmentBackup = asyncHandler(async (req, res) => {
  console.log('\n\n\nReceived Obj : ' + JSON.stringify(req.body) + '\n\n\n')

  const obj = {
    name: req.body.name,
    id: req.body.id,
    region: req.body.region,
    status: req.body.status,
    ontapVersion: req.body['ontap-version'],
    backupEnablementStatus: req.body['backup-enablement-status'],
    type: req.body.type,
    provider: req.body.provider,
    providerAccountId: req.body['provider-account-id'],
    providerAccountName: req.body['provider-account-name'],
    bucket: req.body.bucket,
    usedCapacityGB: req.body['used-capacity-gb'],
    chargingCapacityBytes: req.body['charging-capacity'],
    logicalUsedSizeBytes: req.body['logical-used-size'],
    backedUpVolumeCount: req.body['backed-up-volume-count'],
    totalVolumesCount: req.body['total-volumes-count'],
    failedBackupVolumeCount: req.body['failed-backup-volume-count'],
    autoBackupEnabled: req.body['auto-backup-enabled'],
    ipSpace: req.body['ip-space'],
    providerAccessKey: req.body['provider-access-key'],
    deleteYearlySnapshots: req.body['delete-yearly-snapshots'],
    exportExistingSnapshots: req.body['export-existing-snapshots'],

    // Foreign keys(s)
    workingEnvironmentPublicId: req.body.workingEnvironmentPublicId,
  }

  console.log('Obj : ' + JSON.stringify(obj))

  try {
    const workingEnvironmentBackup = await WorkingEnvironmentBackup.upsert(obj)

    res.status(201).json(workingEnvironmentBackup)
  } catch (error) {
    res.status(400)
    console.log('Error with backup : ' + JSON.stringify(req.body))
    throw new Error(error)
  }
})

module.exports = {
  upsertWorkingEnvironmentBackup,
  getWorkingEnvironmentsBackup,
}
