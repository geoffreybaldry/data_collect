import Header from 'components/Header'
import { DataGrid, GridFilterModel } from '@mui/x-data-grid'
import DataGridCustomToolbar from 'components/DataGridCustomToolbar'
import { Box, useTheme, useMediaQuery } from '@mui/material'
import { useEffect, useState, useRef, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import useFetch from 'hooks/useFetch'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

function NetappCVOAggregates() {
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

  // Load the aggregate data from the DB
  const url = API_BASE_URL + '/api/aggregate'
  const { data, loading, error } = useFetch(url, options.current, {
    page: page,
    pageSize: pageSize,
    search: search,
    sort: JSON.stringify(sort),
    filter: JSON.stringify(filter),
  })

  const columns = [
    {
      field: '$WorkingEnvironment.name$',
      headerName: 'Working Environment Name',
      flex: 2,
      valueGetter: (params) => {
        return params.row.WorkingEnvironment.name
      },
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 2,
    },
    {
      field: 'availableCapacityBytes',
      headerName: 'Available Capacity (Bytes)',
      flex: 2,
      valueFormatter: (params) => params.value.toLocaleString('en-US'),
    },
    {
      field: 'totalCapacityBytes',
      headerName: 'Total Capacity (Bytes)',
      flex: 2,
      valueFormatter: (params) => params.value.toLocaleString('en-US'),
    },
    {
      field: 'usedCapacityBytes',
      headerName: 'Used Capacity (Bytes)',
      flex: 2,
      valueFormatter: (params) => params.value.toLocaleString('en-US'),
    },
    {
      field: 'state',
      headerName: 'State',
      flex: 1,
    },
    {
      field: 'encryptionType',
      headerName: 'Encryption Type',
      flex: 1,
    },
    {
      field: 'encryptionKeyId',
      headerName: 'Encryption Key ID',
      flex: 1,
    },
    {
      field: 'isRoot',
      headerName: 'Is Root?',
      flex: 1,
    },
    {
      field: 'homeNode',
      headerName: 'Home Node',
      flex: 1,
    },
    {
      field: 'ownerNode',
      headerName: 'Owner Node',
      flex: 1,
    },
    {
      field: 'capacityTier',
      headerName: 'Capacity Tier',
      flex: 1,
    },
    {
      field: 'capacityTierUsedBytes',
      headerName: 'Capacity Tier Used (Bytes)',
      flex: 2,
      valueFormatter: (params) => params.value.toLocaleString('en-US'),
    },
    {
      field: 'sidlEnabled',
      headerName: 'SIDL Enabled?',
      flex: 1,
    },
    {
      field: 'snaplockType',
      headerName: 'SnapLock Type',
      flex: 1,
    },
    {
      field: 'evCompatibilityType',
      headerName: 'Elastic Volume Compatibility Type',
      flex: 1,
    },
    {
      field: 'iops',
      headerName: 'IOPS',
      flex: 1,
    },
    {
      field: 'workingEnvironmentPublicId',
      headerName: 'Working Environment ID',
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
          title="Netapp CVO Aggregates"
          subtitle="All Netapp CVO aggregates"
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
                  // workingEnvironmentId: false,
                },
              },
            }}
            loading={loading}
            getRowId={(row) => row.aggregateId}
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

export default NetappCVOAggregates
