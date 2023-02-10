import Header from 'components/Header'
import { DataGrid, GridFilterModel } from '@mui/x-data-grid'
import DataGridCustomToolbar from 'components/DataGridCustomToolbar'
import { Box, useTheme, useMediaQuery } from '@mui/material'
import { useEffect, useState, useRef, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import useFetch from 'hooks/useFetch'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

function WorkingEnvironmentsBackup() {
  const theme = useTheme()
  const isNonMediumScreens = useMediaQuery('(min-width: 1200px)')

  const { user } = useSelector((state) => state.auth)
  const options = useRef({
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + user.token,
    },
  })

  // values to be sent to the backend
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [sort, setSort] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState({})
  const [searchInput, setSearchInput] = useState('')

  // const onFilterChange = useCallback((filterModel: GridFilterModel) => {
  const onFilterChange = useCallback((filterModel) => {
    // Here you save the data you need from the filter model
    // setQueryOptions({ filterModel: { ...filterModel } });
    setFilter(filterModel)
  }, [])

  // Load the working environment data from the DB
  const url = API_BASE_URL + '/api/workingenvironmentbackup'
  const { data, loading, error } = useFetch(url, options.current, {
    page: page,
    pageSize: pageSize,
    search: search,
    sort: JSON.stringify(sort),
    filter: JSON.stringify(filter),
  })

  const columns = [
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
    },
    {
      field: 'id',
      headerName: 'ID',
      flex: 2,
    },
    {
      field: 'region',
      headerName: 'Region',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
    },
    {
      field: 'ontapVersion',
      headerName: 'Ontap Version',
      flex: 1,
    },
    {
      field: 'backupEnablementStatus',
      headerName: 'Backup Enablement Status',
      flex: 1,
    },
    {
      field: 'type',
      headerName: 'Type',
      flex: 1,
    },
    {
      field: 'provider',
      headerName: 'Provider',
      flex: 1,
    },
    {
      field: 'providerAccountId',
      headerName: 'Provider Account ID',
      flex: 1,
    },
    {
      field: 'providerAccountName',
      headerName: 'Provider Account Name',
      flex: 1,
    },
    {
      field: 'bucket',
      headerName: 'Bucket',
      flex: 3,
    },
    {
      field: 'usedCapacityGB',
      headerName: 'Used Capacity GB',
      flex: 1,
      valueFormatter: (params) => params.value.toLocaleString('en-US'),
    },
    {
      field: 'chargingCapacityBytes',
      headerName: 'Charging Capacity Bytes',
      flex: 2,
      valueFormatter: (params) => params.value.toLocaleString('en-US'),
    },
    {
      field: 'logicalUsedSizeBytes',
      headerName: 'Logical Used Size Bytes',
      flex: 2,
      valueFormatter: (params) => params.value.toLocaleString('en-US'),
    },
    {
      field: 'backedUpVolumeCount',
      headerName: 'Backed Up Volume Count',
      flex: 1,
    },
    {
      field: 'totalVolumesCount',
      headerName: 'Total Volumes Count',
      flex: 1,
    },
    {
      field: 'failedBackupVolumeCount',
      headerName: 'Failed Backup Volume Count',
      flex: 1,
    },
    {
      field: 'autoBackupEnabled',
      headerName: 'Auto Backup Enabled?',
      flex: 1,
    },
    {
      field: 'ipSpace',
      headerName: 'IP Space',
      flex: 1,
    },
    {
      field: 'providerAccessKey',
      headerName: 'Provider Access Key',
      flex: 1,
    },
    {
      field: 'deleteYearlySnapshots',
      headerName: 'Delete Yearly Snapshots?',
      flex: 1,
    },
    {
      field: 'exportExistingSnapshots',
      headerName: 'Export Existing SNapshots?',
      flex: 1,
    },
    {
      field: 'workingEnvironmentPublicId',
      headerName: 'Working Environment Public ID',
      flex: 1,
    },
  ]

  if (error) {
    toast.error(error)
    return <div>{error}</div>
  }

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header
          title="Netapp CVO Working Environments Backup"
          subtitle="All Netapp CVO working environments backup"
        />

        <Box
          height="80vh"
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: theme.palette.primary.light,
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: 'none',
            },
            '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            initialState={{
              columns: {
                columnVisibilityModel: {
                  type: false,
                  provider: false,
                  providerAccountName: false,
                  ipSpace: false,
                  providerAccessKey: false,
                  deleteYearlySnapshots: false,
                  exportExistingSnapshots: false,
                  workingEnvironmentPublicId: false,
                },
              },
            }}
            loading={loading}
            getRowId={(row) => row.id}
            rows={(data && data.rows) || []}
            columns={columns}
            rowCount={(data && data.count) || 0}
            rowsPerPageOptions={[20, 30, 50, 100]}
            pagination
            page={page}
            pageSize={pageSize}
            paginationMode="server"
            sortingMode="server"
            filterMode="server"
            onFilterModelChange={onFilterChange}
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onSortModelChange={(newSortModel) => setSort(newSortModel)}
            components={{ Toolbar: DataGridCustomToolbar }}
            componentsProps={{
              toolbar: {
                searchInput,
                setSearchInput,
                setSearch,
                csvOptions: { allColumns: true },
              },
            }}
            density="compact"
            // checkboxSelection={'true'}
          />
        </Box>
      </Box>
    </>
  )
}

export default WorkingEnvironmentsBackup
